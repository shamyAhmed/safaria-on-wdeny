import { Metadata } from "next";
import { FaLock } from "react-icons/fa6";
import { getTranslations } from "next-intl/server";
import { ResetPasswordFormDynamic } from "@/components/user/AuthDynamicComponents";

export const metadata: Metadata = {
  title: "إعادة تعيين كلمة المرور",
};

const ResetPasswordPage: React.FC = async (): Promise<JSX.Element> => {
  const t = await getTranslations("auth.resetPassword");

  return (
    <div>
      <div className="bg-primary w-[100px] h-[100px] rounded-full flex items-center text-4xl justify-center mb-6">
        <FaLock className="text-white" />
      </div>
      <h1 className="text-[#111113] font-bold mb-4 text-xl">{t("title")}</h1>
      <p className="text-[#B0B0B3] mb-10">{t("description")}</p>
      <ResetPasswordFormDynamic />
    </div>
  );
};

export default ResetPasswordPage;
