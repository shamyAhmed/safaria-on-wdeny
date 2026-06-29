"use client";
import { useState } from "react";
import Modal from "antd/es/modal/Modal";
import { Button } from "antd";
import { PartnerWithUsForm } from "./forms/PartnerWithUsForm";
import { Link } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useLocalizedLink } from "@/hooks/useLocalizedLink";
import { useGetPartnerPopupContent } from "./hooks/useGetPartnerPopupContent";

interface PartnerWithUsModalProps {
  icon?: React.ReactNode;
}

const PartnerWithUsModal = ({ icon }: PartnerWithUsModalProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const t = useTranslations("partnerWithUsModal");
  const getLink = useLocalizedLink();
  const { data, isLoading } = useGetPartnerPopupContent();
  const popupContent = JSON.parse(data?.page?.data || "{}");
  const locale = useLocale();
  const isEnglish = locale === "en";

  const showModal = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    // handleRetake().then(() => setIsModalOpen(false));
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button type="primary" className="buttonS1 sm:w-full" onClick={showModal}>
        {t("buttonText")} {icon}
      </Button>
      <Modal
        title=""
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width="644px"
        wrapClassName="partner-with-us-modal"
        centered
        footer={null}
      >
        <div className="">
          <h3>
            {isEnglish ? popupContent?.title_en : popupContent?.title_ar}
            {/* {t("partnerTitle")} <br />
            {t("partnerSubtitle")}{" "} */}
          </h3>
          <p>
            {isEnglish
              ? popupContent?.description_en
              : popupContent?.description_ar}
            {/* {t("partnerDescription1")} <br /> */}
            {/* {t("partnerDescription2")} */}
          </p>

          <PartnerWithUsForm handleCancel={handleCancel} />

          <p className="privacy-policy-link">
            {t("privacy1")} <br />
            {t("privacy2")}{" "}
            <Link
              href={getLink("/privacy-policy")}
              onClick={() => {
                handleCancel();
              }}
            >
              {t("privacyLink")}
            </Link>
            .
          </p>
        </div>
      </Modal>
    </>
  );
};

export default PartnerWithUsModal;
