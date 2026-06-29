import { ProfileChangePassword_form } from "@/components/user/change-password/forms/ProfileChangePassword_form";
import { ProfileLayout } from "@/components/user/profile/ProfileLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "تغيير كلمة المرور",
};

const ChangePasswordPage: React.FC = (): JSX.Element => {
  return (
    <ProfileLayout
      title="تغيير كلمة المرور"
      currentPage="تغيير كلمة المرور"
      currentLink="/user/change-password"
    >
      <ProfileChangePassword_form />
    </ProfileLayout>
  );
};

export default ChangePasswordPage;
