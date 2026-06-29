// components/header/UserAuthButton.tsx
"use client";

import { Link } from "@/i18n/navigation";
import { FiUser, FiLogOut, FiBell } from "react-icons/fi";
import { RiMapPinLine, RiSuitcaseLine } from "react-icons/ri";
import { useLogout } from "@/hooks/auth/useLogout";
import { useLocalizedLink } from "@/hooks/useLocalizedLink";
import { useAuth } from "@/hooks/auth/useAuth";
import { Button, Dropdown, Space, Avatar } from "antd";
import type { MenuProps } from "antd";
import { IoPersonOutline, IoChevronDown } from "react-icons/io5";
import { useRouter } from "@/i18n/navigation";
import { useGetUserProfile } from "@/hooks/auth/useGetProfile";
import { useTranslations } from "next-intl";

export default function UserAuthButton() {
  const { logout, isLoggingOut } = useLogout();
  const getLink = useLocalizedLink();
  const { isAuthenticated, isLoading } = useAuth();
  const { user } = useGetUserProfile();
  const router = useRouter();
  const t = useTranslations("userAuthButton");

  const items: MenuProps["items"] = [
    {
      key: "profile",
      label: <Link href={getLink("/user/profile")}>{t("menu.profile")}</Link>,
      icon: <FiUser />,
    },
    {
      key: "trips",
      label: <Link href={getLink("/user/my-trips")}>{t("menu.trips")}</Link>,
      icon: <RiSuitcaseLine />,
    },
    {
      key: "notifications",
      label: (
        <Link href={getLink("/user/notifications")}>
          {t("menu.notifications")}
        </Link>
      ),
      icon: <FiBell />,
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      label: t("menu.logout"),
      icon: <FiLogOut />,
      danger: true,
      onClick: () => logout(),
    },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-10 h-10">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (isAuthenticated) {
    return (
      <Dropdown
        menu={{ items }}
        placement="bottomLeft"
        trigger={["click"]}>
        <Button
          type="primary"
          className="!h-11 !rounded-xl !px-4 flex items-center gap-2">
          <Space>
            {user?.name || t("account")}
            <IoChevronDown size={14} />
          </Space>
        </Button>
      </Dropdown>
    );
  }

  return (
    <Button
      title={t("login")}
      type="primary"
      onClick={() => router.push(getLink("/auth/login"))}
      className="!h-11 !rounded-xl w-full !px-2 sm:!px-6">
      <IoPersonOutline size={20} />
      {t("login")}
    </Button>
  );
}
