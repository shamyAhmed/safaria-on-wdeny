"use client";

import { Link, usePathname } from "@/i18n/navigation";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose, IoMdNotificationsOutline } from "react-icons/io";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import UserAuthButton from "./UserAuthButton";
import { TopBar } from "./TopBar";
import LanguageSelect from "./language-select/LanguageSelect";
import NotificationButton from "./NotificationButton";
import { useAuth } from "@/hooks/auth/useAuth";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const pathname = usePathname();
  const t = useTranslations();
  const { isAuthenticated } = useAuth();
  const shouldReduceMotion = useReducedMotion();

  const navlinks = [
    { linkKey: "home", path: "" },
    { linkKey: "about", path: "/about-us" },
    { linkKey: "blogs", path: "/blogs" },
    { linkKey: "contactUs", path: "/contact-us" },
  ];

  const profileSidebarLinks = [
    { nameKey: "personalInfo",   path: "/user/profile" },
    { nameKey: "changePassword", path: "/user/change-password" },
    { nameKey: "myTrips",        path: "/user/my-trips" },
    { nameKey: "savedAddresses", path: "/user/saved-addresses" },
    { nameKey: "notifications",  path: "/user/notifications" },
    { nameKey: "myWallet",       path: "/user/my-wallet" },
    { nameKey: "deleteAccount",  path: "/user/delete-account" },
  ];

  const navVariants = {
    hidden: { y: shouldReduceMotion ? 0 : "-200%" },
    visible: {
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.6,
      },
    },
    exit: {
      y: shouldReduceMotion ? 0 : "-100%",
      transition: { duration: shouldReduceMotion ? 0 : 0.3 },
    },
  };

  const navLists = {
    hidden: { x: shouldReduceMotion ? 0 : "100%" },
    visible: {
      x: shouldReduceMotion ? 0 : "1%",
      transition: shouldReduceMotion
        ? { duration: 0 }
        : { type: "spring", stiffness: 70, damping: 25, delay: 0.3 },
    },
    exit: {
      x: shouldReduceMotion ? 0 : "100%",
      transition: shouldReduceMotion
        ? { duration: 0 }
        : { type: "spring", stiffness: 70, damping: 25, delay: 0.3 },
    },
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else document.body.style.overflow = "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <header
      className={`header w-full transition-all duration-300 ease-in-out`}
      id={t("header.nav.home")}>
      <TopBar />
      <div className="bg-white py-1">
        <div className="header_inner container relative">
          <div className="flex gap-2 items-center">
            <button
              className="transition-all duration-200 lg:hidden min-w-11 min-h-11 flex items-center justify-center"
              onClick={toggleMenu}
              aria-label={t("header.mobileMenu.open")}>
              {!isOpen && (
                <RxHamburgerMenu
                  className={`cursor-pointer text-3xl duration-300 active:scale-95 text-black`}
                />
              )}
            </button>
            <div className="flex items-center">
              <Link href={"/"}>
                <Image
                  src="/images/logo-blue.png"
                  alt={t("header.logoAlt")}
                  width={135}
                  height={30}
                />
              </Link>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="items-center gap-11 hidden lg:flex">
            {navlinks.map((navlink, i) => {
              const path = navlink.path || "/";
              return (
                <Link
                  key={i}
                  href={path}
                  className={`link ${pathname === path ? "!text-primary rounded-lg lg:rounded-2xl bg-primary/20 px-5 py-2 lg:px-[30px] lg:py-[14px] font-bold" : "font-bolder"}`}>
                  {t(`header.nav.${navlink.linkKey}`)}
                </Link>
              );
            })}
          </nav>
          <div className="flex items-center gap-3">
            {isAuthenticated && (
              <div className="hidden sm:block">
                <NotificationButton href={"/user/notifications"} />
              </div>
            )}
            <LanguageSelect className="hidden sm:block" />
            <div className={isAuthenticated ? "" : "hidden sm:block"}>
              <UserAuthButton />
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-full overflow-hidden text-nowrap bg-brown py-[18px] text-[14px]">
        <div className="header-animate flex gap-5 text-white">
          {Array(8)
            .fill(1)
            .map((_, i) => {
              return (
                <React.Fragment key={i}>
                  <p>{t("header.marquee")}</p>
                  <p>&#x2022;</p>
                </React.Fragment>
              );
            })}
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            variants={navVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-0 z-50 flex h-screen w-[100%] flex-col items-start bg-white px-10 py-10 overflow-y-auto">
            <div className="flex w-full justify-end pr-6 text-3xl mb-4">
              <button
                type="button"
                className="min-w-11 min-h-11 flex items-center justify-center text-primary"
                onClick={toggleMenu}
                aria-label={t("header.mobileMenu.close")}>
                <IoMdClose className="cursor-pointer" />
              </button>
            </div>

            <div className="flex w-full flex-col items-start gap-4">
              {navlinks.map((navlink, i) => {
                const path = navlink.path || "/";
                return (
                  <motion.div
                    key={i}
                    variants={navLists}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="w-full">
                    <Link
                      href={path}
                      onClick={toggleMenu}
                      className={`text-xl block text-center py-2 rounded-xl font-light w-full hover:text-gray-400 ${
                        pathname === path
                          ? "font-semibold bg-primary/10 text-primary"
                          : "text-primary"
                      }`}>
                      {t(`header.nav.${navlink.linkKey}`)}
                    </Link>
                  </motion.div>
                );
              })}

              {isAuthenticated &&
                profileSidebarLinks.map((profileLink) => {
                  return (
                    <motion.div
                      key={profileLink.path}
                      variants={navLists}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="w-full">
                      <Link
                        href={profileLink.path}
                        onClick={toggleMenu}
                        className={`text-xl block text-center py-2 rounded-xl font-light w-full hover:text-gray-400 ${
                          pathname === profileLink.path
                            ? "font-semibold bg-primary/10 text-primary"
                            : "text-primary"
                        }`}>
                        {t(`header.profileLinks.${profileLink.nameKey}`)}
                      </Link>
                    </motion.div>
                  );
                })}

              <div className="mt-auto flex w-full gap-2 items-center flex-col">
                {isAuthenticated && (
                  <NotificationButton href={"/user/notifications"} />
                )}
                <div className="w-full">
                  <LanguageSelect className="!w-full" />
                </div>
                {!isAuthenticated && <UserAuthButton />}
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};
