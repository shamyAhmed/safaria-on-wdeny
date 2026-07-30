import { Metadata } from "next";
import { ChangePasswordComponentDynamic } from "@/components/user/AuthDynamicComponents";
import { privatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = privatePageMetadata("نسيت كلمة المرور");

const ForgetPasswordPage: React.FC = (): JSX.Element => {
  return <ChangePasswordComponentDynamic />;
};

export default ForgetPasswordPage;
