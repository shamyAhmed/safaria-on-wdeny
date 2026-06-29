"use client";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AllRightRecieved } from "./AllRightRecieved";
import { useAuth } from "@/hooks/auth/useAuth";
import { useTokenRefresh } from "@/hooks/useTokenRefresh";
import { useScrollTop } from "@/hooks/useScrollTop";
import AppHero from "./AppHero";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isAuthenticated } = useAuth();

  useTokenRefresh(isAuthenticated);
  useScrollTop();

  return (
    <>
      <Header />
      <main className="w-full pb-6 lg:pb-0">
        {children}
      </main>
      <AppHero />
      <Footer />
      <AllRightRecieved />
    </>
  );
}
