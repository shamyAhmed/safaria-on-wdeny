import { Metadata } from "next";
import { VerifyOtpComponentDynamic } from "@/components/user/AuthDynamicComponents";
import { privatePageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return privatePageMetadata("verifyOtp", locale);
}

const VerifyOtpPage: React.FC = (): JSX.Element => {
  return <VerifyOtpComponentDynamic />;
};

export default VerifyOtpPage;
