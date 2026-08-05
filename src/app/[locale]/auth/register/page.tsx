import { Metadata } from "next";
import { RegisterComponentDynamic } from "@/components/user/AuthDynamicComponents";
import { privatePageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return privatePageMetadata("register", locale);
}

const RegisterPage: React.FC = (): JSX.Element => {
  return <RegisterComponentDynamic />;
};

export default RegisterPage;
