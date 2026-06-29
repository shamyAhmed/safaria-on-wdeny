"use client";

import { ProfileLayout } from "@/components/user/profile/ProfileLayout";
import { ProfileVerifyOtpContent } from "@/components/user/profile/ProfileVerifyOtpContent";
import { useLocalizedLink } from "@/hooks/useLocalizedLink";

const ProfileVerifyOtpPage = () => {
  const getLink = useLocalizedLink();

  return (
    <ProfileLayout
      title="تأكيد رقم الهاتف"
      currentPage="تأكيد رقم الهاتف"
      currentLink={getLink("/user/profile/verify-otp")}
    >
      <ProfileVerifyOtpContent />
    </ProfileLayout>
  );
};

export default ProfileVerifyOtpPage;
