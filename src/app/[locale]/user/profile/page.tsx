"use client";

import { ProfileLayout } from "@/components/user/profile/ProfileLayout";
import { PersonalInfoForm } from "@/components/user/profile/PersonalInfoForm";
import { useLocalizedLink } from "@/hooks/useLocalizedLink";
import { useTranslations } from "next-intl";

const PersonalInfoPage = () => {
  const getLink = useLocalizedLink();
  const t = useTranslations("profile.nav");

  return (
    <ProfileLayout
      title={t("personalInfo")}
      currentPage={t("personalInfo")}
      currentLink={getLink("/user/profile")}
    >
      <PersonalInfoForm />
    </ProfileLayout>
  );
};

export default PersonalInfoPage;
