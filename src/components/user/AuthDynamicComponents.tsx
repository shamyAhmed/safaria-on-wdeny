"use client";
import dynamic from "next/dynamic";
import { AuthFormSkeleton } from "./AuthFormSkeleton";

export const LoginComponentDynamic = dynamic(
  () =>
    import("@/components/user/login/LoginComponent").then((m) => ({
      default: m.LoginComponent,
    })),
  { ssr: false, loading: () => <AuthFormSkeleton fields={2} /> }
);

export const RegisterComponentDynamic = dynamic(
  () =>
    import("@/components/user/signup/SignupComponent").then((m) => ({
      default: m.RegisterComponent,
    })),
  { ssr: false, loading: () => <AuthFormSkeleton fields={5} /> }
);

export const ChangePasswordComponentDynamic = dynamic(
  () =>
    import(
      "@/components/user/change-password/ChangePasswordComponent"
    ).then((m) => ({ default: m.ChangePasswordComponent })),
  { ssr: false, loading: () => <AuthFormSkeleton /> }
);

export const VerifyOtpComponentDynamic = dynamic(
  () => import("@/components/user/verify-otp/VerifyOtpComponent"),
  { ssr: false, loading: () => <AuthFormSkeleton /> }
);

export const ResetPasswordFormDynamic = dynamic(
  () =>
    import(
      "@/components/user/change-password/forms/ResetPassword_form"
    ).then((m) => ({ default: m.ResetPassword_form })),
  { ssr: false, loading: () => <AuthFormSkeleton /> }
);

export const RegisterCompanyComponentDynamic = dynamic(
  () =>
    import(
      "@/components/user/register-company/RegisterCompanyComponent"
    ).then((m) => ({ default: m.RegisterCompanyComponent })),
  { ssr: false, loading: () => <AuthFormSkeleton /> }
);
