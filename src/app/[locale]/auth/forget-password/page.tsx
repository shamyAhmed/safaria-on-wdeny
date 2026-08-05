import { Metadata } from "next";
import { ChangePasswordComponentDynamic } from "@/components/user/AuthDynamicComponents";
import { privatePageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return privatePageMetadata("forgetPassword", locale);
}

const ForgetPasswordPage: React.FC = (): JSX.Element => {
  return <ChangePasswordComponentDynamic />;
};

export default ForgetPasswordPage;
