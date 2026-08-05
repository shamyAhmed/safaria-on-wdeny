"use client";

import { Modal, Button } from "antd";
import { FiTrash2 } from "react-icons/fi";
import { useTranslations } from "next-intl";
import useDeleteAddress from "@/app/[locale]/_hooks/useDeleteAddress";

interface DeleteAddressModalProps {
  open: boolean;
  addressId: number | null;
  onClose: () => void;
}

export const DeleteAddressModal = ({ open, addressId, onClose }: DeleteAddressModalProps) => {
  const t = useTranslations("savedAddresses.deleteModal");
  const { mutate: deleteAddress, isPending } = useDeleteAddress(addressId ?? 0, onClose);

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      width={400}
      title={
        <div className="flex items-center gap-2 text-red-500">
          <FiTrash2 />
          <span className="font-bold">{t("title")}</span>
        </div>
      }
    >
      <p className="text-gray-600 text-sm mb-6 mt-2">
        {t("description")}
      </p>
      <div className="flex items-center justify-end gap-3">
        <Button onClick={onClose} disabled={isPending}>
          {t("cancel")}
        </Button>
        <Button
          danger
          type="primary"
          loading={isPending}
          onClick={() => deleteAddress()}
        >
          {t("confirm")}
        </Button>
      </div>
    </Modal>
  );
};
