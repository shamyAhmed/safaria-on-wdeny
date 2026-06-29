"use client";
import { Button } from "antd";
import Modal from "antd/es/modal/Modal";
import { useState } from "react";
import ReactCodeInput from "react-code-input";

interface ConfirmationCodeModalProps {
  open: boolean;
  onClose: () => void;
}

export const ConfirmationCodeModal = ({
  open,
  onClose,
}: ConfirmationCodeModalProps) => {
  const [code, setCode] = useState("");

  const handleChange = (value: string) => {
    setCode(value);
    console.log("Code:", value);
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <>
      <Modal
        title=""
        open={open}
        onCancel={handleCancel}
        width="620px"
        wrapClassName="confirmation-code-modal"
        centered
        footer={null}
      >
        <div className="flex flex-col items-center justify-center">
          <h4 className="mt-10 mb-4 font-bold text-primary text-2xl">
            رمز التحقق
          </h4>
          <p className="mb-8 text-[#B0B0B3]">
            أدخل رمز التحقق المكوّن من 4 أرقام المرسل إلى رقمك.
          </p>
          <ReactCodeInput
            type="password"
            fields={4}
            onChange={handleChange}
            name={""}
            inputMode={"tel"}
          />
          <Button
            htmlType="submit"
            type="primary"
            // disabled={loginLoading}
            // loading={loginLoading}
            className={`w-full mt-8 !text-xl`}
          >
            التالي{" "}
          </Button>
        </div>
      </Modal>
    </>
  );
};
