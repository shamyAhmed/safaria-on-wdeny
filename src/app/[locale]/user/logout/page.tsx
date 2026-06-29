"use client";

import { ProfileLayout } from "@/components/user/profile/ProfileLayout";
import { DangerActionCard } from "@/components/user/profile/DangerActionCard";
import { useLocalizedLink } from "@/hooks/useLocalizedLink";
import { useLogout } from "@/hooks/auth/useLogout";
import { useRouter } from "@/i18n/navigation";
import { RiLogoutCircleRLine } from "react-icons/ri";

const LogoutPage = () => {
    const getLink = useLocalizedLink();
    const { logout, isLoggingOut } = useLogout();
    const router = useRouter();

    return (
        <ProfileLayout
            title="تسجيل الخروج"
            currentPage="تسجيل الخروج"
            currentLink={getLink("/user/logout")}
        >
            <DangerActionCard
                title="تسجيل الخروج؟"
                subtitle="هل أنت متأكد أنك تريد تسجيل الخروج من حسابك؟"
                confirmLabel="سجل خروجي"
                confirmIcon={<RiLogoutCircleRLine className="text-base" />}
                confirmLoading={isLoggingOut}
                onConfirm={() => logout()}
                onBack={() => router.back()}
            />
        </ProfileLayout>
    );
};

export default LogoutPage;
