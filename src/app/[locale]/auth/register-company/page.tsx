import { Metadata } from "next";
import { RegisterCompanyComponentDynamic } from "@/components/user/AuthDynamicComponents";

export const metadata: Metadata = {
  title: "انضم كشركة أتوبيسات",
};

const RegisterCompanyPage: React.FC = (): JSX.Element => {
  return <RegisterCompanyComponentDynamic />;
};

export default RegisterCompanyPage;
