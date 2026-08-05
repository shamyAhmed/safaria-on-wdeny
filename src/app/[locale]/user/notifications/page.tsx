"use client";

import { ProfileLayout } from "@/components/user/profile/ProfileLayout";
import { NotificationsContent } from "@/components/user/notifications/NotificationsContent";
import { useLocalizedLink } from "@/hooks/useLocalizedLink";
import { useTranslations } from "next-intl";

const NotificationsPage = () => {
    const getLink = useLocalizedLink();
    const t = useTranslations("profile.nav");

    return (
        <ProfileLayout
            title={t("notifications")}
            currentPage={t("notifications")}
            currentLink={getLink("/user/notifications")}
        >
            <NotificationsContent />
        </ProfileLayout>
    );
};

export default NotificationsPage;
