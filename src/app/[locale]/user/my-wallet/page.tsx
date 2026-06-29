"use client";

import { ProfileLayout } from "@/components/user/profile/ProfileLayout";
import { MyWalletContent } from "@/components/user/my-wallet/MyWalletContent";
import { useLocalizedLink } from "@/hooks/useLocalizedLink";

const MyWalletPage = () => {
    const getLink = useLocalizedLink();

    return (
        <ProfileLayout
            title="محفظتي"
            currentPage="محفظتي"
            currentLink={getLink("/user/my-wallet")}
        >
            <MyWalletContent />
        </ProfileLayout>
    );
};

export default MyWalletPage;
