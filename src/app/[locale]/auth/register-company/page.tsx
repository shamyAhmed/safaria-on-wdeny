import { Metadata } from "next";
import { RegisterCompanyComponentDynamic } from "@/components/user/AuthDynamicComponents";
import { privatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = privatePageMetadata("انضم كشركة أتوبيسات");

const RegisterCompanyPage: React.FC = (): JSX.Element => {
  return <RegisterCompanyComponentDynamic />;
};

export default RegisterCompanyPage;
