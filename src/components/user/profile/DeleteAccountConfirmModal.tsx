"use client";

import { useState } from "react";
import { Modal, Input, Button } from "antd";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("profile.deleteAccountModal");
  // The word the user has to type is itself translated, so it has to come from
  // the messages rather than a module constant.
  const confirmWord = t("confirmWord");
  const [typedWord, setTypedWord] = useState("");
  const isConfirmed = typedWord.trim() === confirmWord;

  const handleCancel = () => {
    setTypedWord("");
    onCancel();
  };

  return (
    <Modal
      title={t("title")}
      open={open}
      onCancel={handleCancel}
      centered
      footer={null}
    >
      <p className="text-sm text-gray-500 mb-4">
        {t.rich("description", {
          word: () => (
            <span className="font-bold text-red-600">&quot;{confirmWord}&quot;</span>
          ),
        })}
      </p>
      <Input
        value={typedWord}
        onChange={(e) => setTypedWord(e.target.value)}
        placeholder={confirmWord}
        className="mb-4"
      />
      <div className="flex items-center justify-end gap-2">
        <Button onClick={handleCancel}>{t("cancel")}</Button>
        <Button
          type="primary"
          danger
          disabled={!isConfirmed}
          loading={loading}
          onClick={onConfirm}
        >
          {t("confirm")}
        </Button>
      </div>
    </Modal>
  );
};
