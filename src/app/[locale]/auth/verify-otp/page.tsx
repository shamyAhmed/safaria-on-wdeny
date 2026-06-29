import { Metadata } from "next";
import { VerifyOtpComponentDynamic } from "@/components/user/AuthDynamicComponents";

export const metadata: Metadata = {
  title: "تحقق من رمز التأكيد",
};

const VerifyOtpPage: React.FC = (): JSX.Element => {
  return <VerifyOtpComponentDynamic />;
};

export default VerifyOtpPage;
