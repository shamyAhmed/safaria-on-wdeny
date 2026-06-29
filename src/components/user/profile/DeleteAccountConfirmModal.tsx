"use client";

import { useState } from "react";
import { Modal, Input, Button } from "antd";

const CONFIRM_WORD = "حذف";

interface DeleteAccountConfirmModalProps {
  open: boolean;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const DeleteAccountConfirmModal = ({
  open,
  loading = false,
  onConfirm,
  onCancel,
}: DeleteAccountConfirmModalProps) => {
  const [typedWord, setTypedWord] = useState("");
  const isConfirmed = typedWord.trim() === CONFIRM_WORD;

  const handleCancel = () => {
    setTypedWord("");
    onCancel();
  };

  return (
    <Modal
      title="تأكيد حذف الحساب نهائياً"
      open={open}
      onCancel={handleCancel}
      centered
      footer={null}
    >
      <p className="text-sm text-gray-500 mb-4">
        هذا إجراء نهائي لا يمكن التراجع عنه. للتأكيد، اكتب كلمة{" "}
        <span className="font-bold text-red-600">&quot;{CONFIRM_WORD}&quot;</span> في الحقل أدناه.
      </p>
      <Input
        value={typedWord}
        onChange={(e) => setTypedWord(e.target.value)}
        placeholder={CONFIRM_WORD}
        className="mb-4"
      />
      <div className="flex items-center justify-end gap-2">
        <Button onClick={handleCancel}>إلغاء</Button>
        <Button
          type="primary"
          danger
          disabled={!isConfirmed}
          loading={loading}
          onClick={onConfirm}
        >
          تأكيد الحذف نهائياً
        </Button>
      </div>
    </Modal>
  );
};
