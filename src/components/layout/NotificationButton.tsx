import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { IoMdNotificationsOutline } from "react-icons/io";
import { useGetNotifications } from "@/hooks/useGetNotifications";

interface NotificationButtonProps {
  href: string;
}

const NotificationButton = ({ href }: NotificationButtonProps) => {
  const t = useTranslations();
  const { notifications } = useGetNotifications();
  const unreadCount = notifications.filter((n) => n.read_at === null).length;

  return (
    <Link
      href={href}
      className="w-[42px] h-[42px] bg-[#F9F9F9] relative rounded-xl flex items-center justify-center"
      aria-label={t("header.notifications")}
      title={t("header.notifications")}>
      {unreadCount > 0 && (
        <div className="size-5 absolute -top-0 flex justify-center items-center text-sm start-1 rounded-full bg-primary text-white">
          {unreadCount > 9 ? "9+" : unreadCount}
        </div>
      )}
      <IoMdNotificationsOutline size={28} className="text-[#333] block" />
    </Link>
  );
};

export default NotificationButton;
