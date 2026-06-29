import { Metadata } from "next";
import { RegisterComponentDynamic } from "@/components/user/AuthDynamicComponents";

export const metadata: Metadata = {
  title: "اكمل بياناتك",
};

const RegisterPage: React.FC = (): JSX.Element => {
  return <RegisterComponentDynamic />;
};

export default RegisterPage;
