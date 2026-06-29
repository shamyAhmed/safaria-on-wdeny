"use client";

import { ProfileLayout } from "@/components/user/profile/ProfileLayout";
import { NotificationsContent } from "@/components/user/notifications/NotificationsContent";
import { useLocalizedLink } from "@/hooks/useLocalizedLink";

const NotificationsPage = () => {
    const getLink = useLocalizedLink();

    return (
        <ProfileLayout
            title="الإشعارات"
            currentPage="الإشعارات"
            currentLink={getLink("/user/notifications")}
        >
            <NotificationsContent />
        </ProfileLayout>
    );
};

export default NotificationsPage;
