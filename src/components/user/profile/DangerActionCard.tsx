"use client";

import Image from "next/image";
import { Button } from "antd";
import { useTranslations } from "next-intl";

interface DangerActionCardProps {
  title: string;
  subtitle: string;
  confirmLabel: string;
  confirmIcon?: React.ReactNode;
  confirmLoading?: boolean;
  onConfirm: () => void;
  onBack: () => void;
}

export const DangerActionCard = ({
  title,
  subtitle,
  confirmLabel,
  confirmIcon,
  confirmLoading = false,
  onConfirm,
  onBack,
}: DangerActionCardProps) => {
  const t = useTranslations("common");

  return (
    <div className="flex flex-col items-center justify-center py-10 px-6 text-center border-2 border-dashed border-gray-200 rounded-3xl">
      {/* Icon */}
      <div className="mb-6">
        <Image
          src="/images/profile/danger-action-icon.png"
          alt="danger"
          width={100}
          height={100}
          className="mx-auto"
        />
      </div>

      {/* Text */}
      <h2 className="text-xl font-bold text-gray-800 mb-2">{title}</h2>
      <p className="text-sm text-gray-400 mb-8 max-w-xs">{subtitle}</p>

      {/* Actions */}
      <div className="flex items-center gap-3 flex-wrap justify-center">
        <Button
          type="primary"
          icon={confirmIcon}
          iconPosition="end"
          loading={confirmLoading}
          onClick={onConfirm}
          className="!flex !items-center !gap-2 min-w-[130px]"
        >
          {confirmLabel}
        </Button>
        <Button
          onClick={onBack}
          className="min-w-[100px]"
        >
          {t("back")}
        </Button>
      </div>
    </div>
  );
};
