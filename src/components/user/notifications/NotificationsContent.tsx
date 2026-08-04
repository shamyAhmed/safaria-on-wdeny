"use client";

import { RiBellLine, RiDeleteBin6Line } from "react-icons/ri";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useLocale, useTranslations } from "next-intl";
import dayjs from "dayjs";
import { useGetNotifications } from "@/hooks/useGetNotifications";
import { useDeleteNotifications } from "@/hooks/useDeleteNotifications";
import { Notification } from "@/types/types";
import { formatDateLong } from "@/utils/formatDate";
import NotificationItem from "./NotificationItem";

const NotificationSkeleton = () => (
  <div className="animate-pulse">
    <div className="flex items-center justify-between mb-4 px-1">
      <div className="h-4 w-12 bg-gray-200 rounded" />
      <div className="h-4 w-20 bg-gray-200 rounded" />
    </div>
    {[1, 2, 3].map((i) => (
      <div key={i} className="flex items-center gap-3 p-4 mb-3 rounded-2xl bg-gray-50">
        <div className="h-11 w-11 bg-gray-200 rounded-full flex-shrink-0" />
        <div className="flex-1 space-y-2 min-w-0">
          <div className="h-4 w-3/4 bg-gray-200 rounded" />
          <div className="h-3 w-full bg-gray-200 rounded" />
          <div className="h-3 w-2/3 bg-gray-200 rounded" />
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="h-3 w-10 bg-gray-200 rounded" />
          <div className="h-3 w-10 bg-gray-200 rounded" />
          <div className="h-4 w-4 bg-gray-200 rounded-full" />
        </div>
      </div>
    ))}
  </div>
);

function groupByDate(
  notifications: Notification[],
  todayLabel: string,
  yesterdayLabel: string,
  locale: string,
) {
  const today = dayjs().startOf("day");
  const yesterday = dayjs().subtract(1, "day").startOf("day");

  const map = new Map<string, Notification[]>();

  for (const n of notifications) {
    const d = dayjs(n.created_date);
    const key = d.isSame(today, "day")
      ? todayLabel
      : d.isSame(yesterday, "day")
        ? yesterdayLabel
        : formatDateLong(n.created_date, locale);

    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(n);
  }

  const groups: { label: string; items: Notification[] }[] = [];
  map.forEach((items, label) => groups.push({ label, items }));
  return groups;
}

export const NotificationsContent = () => {
  const t = useTranslations("notificationsPage");
  const locale = useLocale();
  const { notifications, isLoading } = useGetNotifications();
  const { deleteNotifications, isDeleting } = useDeleteNotifications();

  const groups = groupByDate(notifications, t("today"), t("yesterday"), locale);
  const hasNotifications = notifications.length > 0;

  return (
    <div className="formS1 !border-none">
      {/* Page Header */}
      <h2 className="text-2xl font-bold mb-8 text-center lg:text-start border-b border-[#E2E2E2] pb-6">
        {t("title")}
      </h2>

      {isLoading ? (
        <NotificationSkeleton />
      ) : hasNotifications ? (
        <>
          {groups.map((group, index) => (
            <div key={group.label}>
              <div className="flex justify-between mb-4 px-1">
                <span className="text-sm font-semibold text-gray-600">{group.label}</span>
                {index === 0 && (
                  <button
                    onClick={() => deleteNotifications()}
                    disabled={isDeleting}
                    className="flex items-center gap-1.5 text-sm font-semibold text-gray-600 transition-opacity hover:opacity-75 disabled:opacity-50">
                    {isDeleting ? (
                      <AiOutlineLoading3Quarters className="text-base animate-spin" />
                    ) : (
                      <RiDeleteBin6Line className="text-base" />
                    )}
                    <span>{t("clearAll")}</span>
                  </button>
                )}
              </div>
              {group.items.map((item) => (
                <NotificationItem key={item.id} item={item} />
              ))}
            </div>
          ))}
        </>
      ) : (
        <>
          <div className="flex items-center justify-between mb-4 px-1">
            <span className="text-sm text-gray-400">{t("today")}</span>
            <button
              disabled
              className="flex items-center gap-1.5 text-sm font-semibold text-gray-300 cursor-not-allowed">
              <RiDeleteBin6Line className="text-base" />
              <span>{t("clearAll")}</span>
            </button>
          </div>
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-5">
              <RiBellLine className="text-4xl text-gray-300" />
            </div>
            <h3 className="text-lg font-semibold text-gray-600 mb-2">{t("empty.title")}</h3>
            <p className="text-sm text-gray-400 max-w-xs">{t("empty.description")}</p>
          </div>
        </>
      )}
    </div>
  );
};
