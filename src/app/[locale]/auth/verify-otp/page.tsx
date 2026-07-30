import { Metadata } from "next";
import { VerifyOtpComponentDynamic } from "@/components/user/AuthDynamicComponents";
import { privatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = privatePageMetadata("تحقق من رمز التأكيد");

const VerifyOtpPage: React.FC = (): JSX.Element => {
  return <VerifyOtpComponentDynamic />;
};

export default VerifyOtpPage;
