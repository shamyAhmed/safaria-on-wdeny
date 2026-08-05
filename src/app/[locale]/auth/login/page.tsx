import { Metadata } from "next";
import { LoginComponentDynamic } from "@/components/user/AuthDynamicComponents";
import { privatePageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return privatePageMetadata("login", locale);
}

const LoginPage: React.FC = (): JSX.Element => {
  return <LoginComponentDynamic />;
};

export default LoginPage;
