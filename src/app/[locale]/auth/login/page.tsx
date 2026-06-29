import { Metadata } from "next";
import { LoginComponentDynamic } from "@/components/user/AuthDynamicComponents";

export const metadata: Metadata = {
  title: "الدخول إلى حسابك",
};

const LoginPage: React.FC = (): JSX.Element => {
  return <LoginComponentDynamic />;
};

export default LoginPage;
