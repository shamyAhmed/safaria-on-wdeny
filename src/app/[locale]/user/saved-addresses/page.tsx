"use client";

import { ProfileLayout } from "@/components/user/profile/ProfileLayout";
import { SavedAddressesContent } from "@/components/user/saved-addresses/SavedAddressesContent";
import { useLocalizedLink } from "@/hooks/useLocalizedLink";

const SavedAddressesPage = () => {
    const getLink = useLocalizedLink();

    return (
        <ProfileLayout
            title="العناوين المحفوظة"
            currentPage="العناوين المحفوظة"
            currentLink={getLink("/user/saved-addresses")}
        >
            <SavedAddressesContent />
        </ProfileLayout>
    );
};

export default SavedAddressesPage;
