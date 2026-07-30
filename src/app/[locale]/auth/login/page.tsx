import { Metadata } from "next";
import { LoginComponentDynamic } from "@/components/user/AuthDynamicComponents";
import { privatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = privatePageMetadata("الدخول إلى حسابك");

const LoginPage: React.FC = (): JSX.Element => {
  return <LoginComponentDynamic />;
};

export default LoginPage;
