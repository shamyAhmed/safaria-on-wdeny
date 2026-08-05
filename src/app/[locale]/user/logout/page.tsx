"use client";

import { ProfileLayout } from "@/components/user/profile/ProfileLayout";
import { DangerActionCard } from "@/components/user/profile/DangerActionCard";
import { useLocalizedLink } from "@/hooks/useLocalizedLink";
import { useTranslations } from "next-intl";
import { useLogout } from "@/hooks/auth/useLogout";
import { useRouter } from "@/i18n/navigation";
import { RiLogoutCircleRLine } from "react-icons/ri";

const LogoutPage = () => {
    const getLink = useLocalizedLink();
    const t = useTranslations("profile.logoutPage");
    const { logout, isLoggingOut } = useLogout();
    const router = useRouter();

    return (
        <ProfileLayout
            title={t("pageTitle")}
            currentPage={t("pageTitle")}
            currentLink={getLink("/user/logout")}
        >
            <DangerActionCard
                title={t("cardTitle")}
                subtitle={t("cardSubtitle")}
                confirmLabel={t("confirm")}
                confirmIcon={<RiLogoutCircleRLine className="text-base" />}
                confirmLoading={isLoggingOut}
                onConfirm={() => logout()}
                onBack={() => router.back()}
            />
        </ProfileLayout>
    );
};

export default LogoutPage;
