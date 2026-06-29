"use client";

import { ProfileLayout } from "@/components/user/profile/ProfileLayout";
import { PersonalInfoForm } from "@/components/user/profile/PersonalInfoForm";
import { useLocalizedLink } from "@/hooks/useLocalizedLink";

const PersonalInfoPage = () => {
  const getLink = useLocalizedLink();

  return (
    <ProfileLayout
      title="الحساب الشخصي"
      currentPage="الحساب الشخصي"
      currentLink={getLink("/user/profile")}
    >
      <PersonalInfoForm />
    </ProfileLayout>
  );
};

export default PersonalInfoPage;
