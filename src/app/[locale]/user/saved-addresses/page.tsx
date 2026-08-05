"use client";

import { ProfileLayout } from "@/components/user/profile/ProfileLayout";
import { SavedAddressesContent } from "@/components/user/saved-addresses/SavedAddressesContent";
import { useLocalizedLink } from "@/hooks/useLocalizedLink";
import { useTranslations } from "next-intl";

const SavedAddressesPage = () => {
    const getLink = useLocalizedLink();
    const t = useTranslations("profile.nav");

    return (
        <ProfileLayout
            title={t("savedAddresses")}
            currentPage={t("savedAddresses")}
            currentLink={getLink("/user/saved-addresses")}
        >
            <SavedAddressesContent />
        </ProfileLayout>
    );
};

export default SavedAddressesPage;
