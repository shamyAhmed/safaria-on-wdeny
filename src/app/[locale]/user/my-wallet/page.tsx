"use client";

import { ProfileLayout } from "@/components/user/profile/ProfileLayout";
import { MyWalletContent } from "@/components/user/my-wallet/MyWalletContent";
import { useLocalizedLink } from "@/hooks/useLocalizedLink";
import { useTranslations } from "next-intl";

const MyWalletPage = () => {
    const getLink = useLocalizedLink();
    const t = useTranslations("profile.nav");

    return (
        <ProfileLayout
            title={t("wallet")}
            currentPage={t("wallet")}
            currentLink={getLink("/user/my-wallet")}
        >
            <MyWalletContent />
        </ProfileLayout>
    );
};

export default MyWalletPage;
