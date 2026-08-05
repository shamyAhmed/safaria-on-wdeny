"use client";

import { useState } from "react";
import { ProfileLayout } from "@/components/user/profile/ProfileLayout";
import { DangerActionCard } from "@/components/user/profile/DangerActionCard";
import { DeleteAccountConfirmModal } from "@/components/user/profile/DeleteAccountConfirmModal";
import { useLocalizedLink } from "@/hooks/useLocalizedLink";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { RiDeleteBin6Line } from "react-icons/ri";

const DeleteAccountPage = () => {
    const getLink = useLocalizedLink();
    const t = useTranslations("profile.deleteAccountPage");
    const router = useRouter();
    const [confirmModalOpen, setConfirmModalOpen] = useState(false);

    const handleDelete = () => {
        // placeholder — wire up to API later (also needs backend re-authentication, see #51)
        setConfirmModalOpen(false);
    };

    return (
        <ProfileLayout
            title={t("pageTitle")}
            currentPage={t("pageTitle")}
            currentLink={getLink("/user/delete-account")}
        >
            <DangerActionCard
                title={t("cardTitle")}
                subtitle={t("cardSubtitle")}
                confirmLabel={t("confirm")}
                confirmIcon={<RiDeleteBin6Line className="text-base" />}
                onConfirm={() => setConfirmModalOpen(true)}
                onBack={() => router.back()}
            />
            <DeleteAccountConfirmModal
                open={confirmModalOpen}
                onConfirm={handleDelete}
                onCancel={() => setConfirmModalOpen(false)}
            />
        </ProfileLayout>
    );
};

export default DeleteAccountPage;
