import { Metadata } from "next";
import { ChangePasswordComponentDynamic } from "@/components/user/AuthDynamicComponents";

export const metadata: Metadata = {
  title: "نسيت كلمة المرور",
};

const ForgetPasswordPage: React.FC = (): JSX.Element => {
  return <ChangePasswordComponentDynamic />;
};

export default ForgetPasswordPage;
