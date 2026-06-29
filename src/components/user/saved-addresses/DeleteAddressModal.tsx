"use client";

import { Modal, Button } from "antd";
import { FiTrash2 } from "react-icons/fi";
import useDeleteAddress from "@/app/[locale]/_hooks/useDeleteAddress";

interface DeleteAddressModalProps {
  open: boolean;
  addressId: number | null;
  onClose: () => void;
}

export const DeleteAddressModal = ({ open, addressId, onClose }: DeleteAddressModalProps) => {
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
          <span className="font-bold">حذف العنوان</span>
        </div>
      }
    >
      <p className="text-gray-600 text-sm mb-6 mt-2">
        هل أنت متأكد من حذف هذا العنوان؟ لا يمكن التراجع عن هذا الإجراء.
      </p>
      <div className="flex items-center justify-end gap-3">
        <Button onClick={onClose} disabled={isPending}>
          إلغاء
        </Button>
        <Button
          danger
          type="primary"
          loading={isPending}
          onClick={() => deleteAddress()}
        >
          حذف
        </Button>
      </div>
    </Modal>
  );
};
