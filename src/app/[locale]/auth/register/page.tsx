import { Metadata } from "next";
import { RegisterComponentDynamic } from "@/components/user/AuthDynamicComponents";
import { privatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = privatePageMetadata("اكمل بياناتك");

const RegisterPage: React.FC = (): JSX.Element => {
  return <RegisterComponentDynamic />;
};

export default RegisterPage;
