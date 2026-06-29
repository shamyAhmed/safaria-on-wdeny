"use client";

import { useState } from "react";
import { ProfileLayout } from "@/components/user/profile/ProfileLayout";
import { DangerActionCard } from "@/components/user/profile/DangerActionCard";
import { DeleteAccountConfirmModal } from "@/components/user/profile/DeleteAccountConfirmModal";
import { useLocalizedLink } from "@/hooks/useLocalizedLink";
import { useRouter } from "@/i18n/navigation";
import { RiDeleteBin6Line } from "react-icons/ri";

const DeleteAccountPage = () => {
    const getLink = useLocalizedLink();
    const router = useRouter();
    const [confirmModalOpen, setConfirmModalOpen] = useState(false);

    const handleDelete = () => {
        // placeholder — wire up to API later (also needs backend re-authentication, see #51)
        setConfirmModalOpen(false);
    };

    return (
        <ProfileLayout
            title="حذف الحساب"
            currentPage="حذف الحساب"
            currentLink={getLink("/user/delete-account")}
        >
            <DangerActionCard
                title="حذف الحساب؟"
                subtitle="هل أنت متأكد أنك تريد حذف حسابك نهائياً؟ لا يمكن التراجع عن هذا الإجراء."
                confirmLabel="احذف حسابي"
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
