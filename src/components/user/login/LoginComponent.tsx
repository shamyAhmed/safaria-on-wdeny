"use client";
import { Login_form } from "./forms/Login_form";
import { Suspense } from "react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";

export const LoginComponent = () => {
  const t = useTranslations("auth.login");
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");
  const registerHref = redirect
    ? `/auth/register?redirect=${encodeURIComponent(redirect)}`
    : "/auth/register";

  return (
    <div className="w-full flex flex-col justify-center">
      <h2 className="text-3xl mb-6 font-bold">{t("title")}</h2>
      <p className="text-[#707070] mb-10">
        {t("noAccount")}
        <Link href={registerHref} className="mb-6 text-primary font-bold">
          {" "}
          {t("createAccount")}
        </Link>
      </p>

      <Suspense>
        <Login_form />
      </Suspense>
    </div>
  );
};
