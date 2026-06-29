"use client";

import { IoCheckmark } from "react-icons/io5";
import { LuClock3 } from "react-icons/lu";
import { useTranslations } from "next-intl";
import { Notification } from "@/types/types";

const formatDate = (dateStr: string) => {
  const d = new Date(dateStr);
  const day = d.getDate();
  const month = d.getMonth() + 1;
  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");
  const year = String(d.getFullYear());
  return { time: `${hours}:${minutes}`, date: `${day}/${month}/${year}` };
};

const NotificationItem = ({ item }: { item: Notification }) => {
  const t = useTranslations("notificationsPage.item");
  const isRead = item.read_at !== null;
  return (
    <div
      className={`flex gap-3 p-4 mb-3 rounded-2xl transition-colors ${
        !isRead ? "bg-primary/5 border border-primary/10" : "bg-white border border-gray-100"
      }`}>
      {/* Start: checkmark */}
      <button
        className="flex-shrink-0 self-center transition-opacity hover:opacity-75"
        aria-label={isRead ? t("alreadyRead") : t("markAsRead")}>
        {!isRead ? (
          <div className="w-11 h-11 rounded-full bg-primary/10 border border-primary flex items-center justify-center">
            <div className="w-[22px] h-[22px] rounded-full bg-primary flex items-center justify-center">
              <IoCheckmark className="text-white text-sm" />
            </div>
          </div>
        ) : (
          <div className="w-11 h-11 rounded-full bg-white border border-gray-300 flex items-center justify-center">
            <div className="w-[22px] h-[22px] rounded-full bg-gray-300 flex items-center justify-center">
              <IoCheckmark className="text-white text-sm" />
            </div>
          </div>
        )}
      </button>

      {/* Middle: title + description */}
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-bold text-gray-800 mb-1">{item.title}</h4>
        <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{item.description}</p>
      </div>

      {/* End: clock + timestamp */}
      <div className="flex-shrink-0 flex items-start gap-2 text-gray-400">
        <span className="text-xs whitespace-nowrap">{formatDate(item.created_date).time}</span>
        <span className="text-xs whitespace-nowrap">{formatDate(item.created_date).date}</span>
        <LuClock3 className="text-base" />
      </div>
    </div>
  );
};

export default NotificationItem;
