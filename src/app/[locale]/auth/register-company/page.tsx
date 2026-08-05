import { Metadata } from "next";
import { RegisterCompanyComponentDynamic } from "@/components/user/AuthDynamicComponents";
import { privatePageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return privatePageMetadata("registerCompany", locale);
}

const RegisterCompanyPage: React.FC = (): JSX.Element => {
  return <RegisterCompanyComponentDynamic />;
};

export default RegisterCompanyPage;
