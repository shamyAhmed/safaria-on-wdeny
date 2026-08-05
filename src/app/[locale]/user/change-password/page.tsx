import { ProfileChangePassword_form } from "@/components/user/change-password/forms/ProfileChangePassword_form";
import { ProfileLayout } from "@/components/user/profile/ProfileLayout";
import { Metadata } from "next";
import { privatePageMetadata } from "@/lib/seo";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return privatePageMetadata("changePassword", locale);
}

const ChangePasswordPage = async () => {
  const t = await getTranslations("profile.nav");

  return (
    <ProfileLayout
      title={t("changePassword")}
      currentPage={t("changePassword")}
      currentLink="/user/change-password"
    >
      <ProfileChangePassword_form />
    </ProfileLayout>
  );
};

export default ChangePasswordPage;
