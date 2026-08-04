"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { useLocalizedLink } from "@/hooks/useLocalizedLink";
import {
  FiUser,
  FiLock,
  FiBell,
  FiMapPin,
  FiLogOut,
  FiTrash2,
} from "react-icons/fi";
import {
  RiLockPasswordFill,
  RiSuitcaseLine,
  RiWalletLine,
} from "react-icons/ri";
import { FaPlane } from "react-icons/fa6";
import { FaMapMarkerAlt } from "react-icons/fa";

export const ProfileSidebar = () => {
  const pathname = usePathname();
  const getLink = useLocalizedLink();
  const t = useTranslations("profile.nav");

  const menuItems = [
    {
      name: t("personalInfo"),
      path: "/user/profile",
      icon: <FiUser />,
    },
    {
      name: t("changePassword"),
      path: "/user/change-password",
      icon: <RiLockPasswordFill />,
    },
    {
      name: t("myTrips"),
      path: "/user/my-trips",
      icon: <FaPlane />,
    },
    {
      name: t("savedAddresses"),
      path: "/user/saved-addresses",
      icon: <FaMapMarkerAlt />,
    },
    {
      name: t("notifications"),
      path: "/user/notifications",
      icon: <FiBell />,
    },
    {
      name: t("wallet"),
      path: "/user/my-wallet",
      icon: <RiWalletLine />,
    },
    {
      name: t("deleteAccount"),
      path: "/user/delete-account",
      icon: <FiTrash2 />,
      danger: true,
    },
  ];

  return (
    <div className="bg-white rounded-[30px] py-5 px-6 h-fit">
      <ul className="flex flex-col">
        {menuItems.map((item) => {
          const fullPath = getLink(item.path);
          const isActive = pathname === fullPath;

          return (
            <li key={item.path}>
              <Link
                href={fullPath}
                className={`flex items-center justify-between py-[30px] transition-all duration-200 border-b hover:text-primary  ${
                  isActive
                    ? " text-primary  border-primary"
                    : "text-gray-600 hover:!text-primary border-[#E2E2E2]"
                } ${item.danger ? "hover:text-red-500" : ""}`}
              >
                <div className="flex items-center gap-[10px]">
                  <span className={`text-xl`}>{item.icon}</span>
                  <span className={`${isActive ? "font-semibold" : "" }`}>{item.name}</span>
                </div>
              </Link>
            </li>
          );
        })}
        <li>
          <Link
            href={getLink("/user/logout")}
            className="w-full flex justify-between py-[30px] rounded-xl transition-all duration-200 text-gray-600 hover:bg-red-50 hover:text-red-500"
          >
            <div className="flex items-center gap-3">
              <span className="text-xl text-gray-600">
                <FiLogOut />
              </span>
              <span className="">{t("logout")}</span>
            </div>
          </Link>
        </li>
      </ul>
    </div>
  );
};
