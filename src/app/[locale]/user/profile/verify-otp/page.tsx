"use client";

import { ProfileLayout } from "@/components/user/profile/ProfileLayout";
import { ProfileVerifyOtpContent } from "@/components/user/profile/ProfileVerifyOtpContent";
import { useLocalizedLink } from "@/hooks/useLocalizedLink";
import { useTranslations } from "next-intl";

const ProfileVerifyOtpPage = () => {
  const getLink = useLocalizedLink();
  const t = useTranslations("profile.verifyPhone");

  return (
    <ProfileLayout
      title={t("pageTitle")}
      currentPage={t("pageTitle")}
      currentLink={getLink("/user/profile/verify-otp")}
    >
      <ProfileVerifyOtpContent />
    </ProfileLayout>
  );
};

export default ProfileVerifyOtpPage;
