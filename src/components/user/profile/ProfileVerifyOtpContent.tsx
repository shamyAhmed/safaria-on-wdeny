"use client";

import React, { useState, useEffect } from "react";
import { Button } from "antd";
import ReactCodeInput from "react-code-input";
import { useSearchParams } from "next/navigation";
import { useRouter } from "@/i18n/navigation";
import { RiSmartphoneLine } from "react-icons/ri";
import { useVerifyAltPhone } from "@/hooks/auth/useVerifyAltPhone";

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

export const ProfileVerifyOtpContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const mobile = searchParams.get("mobile") || "";
  const phonecode = searchParams.get("phonecode") || "";

  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(153);

  const { verifyAltPhoneMutation, verifyAltPhoneLoading } = useVerifyAltPhone();

  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => setTimer((p) => p - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleVerify = async () => {
    if (otp.length !== 4) return;
    await verifyAltPhoneMutation({
      mobile: Number(mobile),
      phonecode: Number(phonecode),
      code: Number(otp),
    });
    router.push("/user/profile");
  };

  const handleResend = async () => {
    setTimer(153);
  };

  return (
    <div className="formS1 !border-none">
      <h2 className="text-2xl font-bold mb-8 text-center lg:text-start border-b border-[#E2E2E2] pb-6">
        تأكيد رقم الهاتف
      </h2>

      <div className="w-full flex flex-col items-center justify-center max-w-[420px] mx-auto py-6">
        <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mb-6 text-white text-4xl">
          <RiSmartphoneLine />
        </div>

        <h3 className="text-xl font-bold mb-2 text-center">أدخل رمز التحقق</h3>
        <p className="text-gray-400 text-sm mb-8 text-center">
          تم إرسال رمز التحقق إلى{" "}
          <span className="font-semibold text-gray-700 dir-ltr inline-block">
            +{phonecode} {mobile}
          </span>
        </p>

        <div className="w-full flex justify-between items-center mb-3">
          <span className="text-lg font-bold text-gray-700">{formatTime(timer)}</span>
          <span className="text-sm text-gray-400">رمز التحقق</span>
        </div>

        <div dir="ltr" className="mb-8 w-full flex justify-center">
          <ReactCodeInput
            fields={4}
            type="text"
            inputMode="numeric"
            onChange={setOtp}
            value={otp}
            name="profile-otp"
            inputStyle={{
              width: "70px",
              height: "80px",
              fontSize: "28px",
              borderRadius: "16px",
              border: "1px solid #F3F4F6",
              margin: "0 8px",
              textAlign: "center",
              backgroundColor: "#F9FAFB",
              color: "#111827",
              outline: "none",
            }}
          />
        </div>

        <p className="text-center text-sm text-gray-500 mb-8">
          لم تستلم الرمز؟{" "}
          <button
            type="button"
            onClick={handleResend}
            disabled={timer > 0}
            className="text-primary font-bold hover:underline disabled:opacity-40 disabled:cursor-not-allowed"
          >
            إعادة الإرسال
          </button>
        </p>

        <Button
          type="primary"
          onClick={handleVerify}
          loading={verifyAltPhoneLoading}
          disabled={otp.length !== 4}
          className="w-full h-12 rounded-2xl text-base font-bold"
        >
          تأكيد
        </Button>
      </div>
    </div>
  );
};
