import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Row, Col } from "antd";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import style from "@/components/user/login/styles/login.module.scss";

// Belt-and-braces alongside the per-page noindex: nothing under /auth belongs
// in the index, including any screen added later without its own metadata.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const tAuth = await getTranslations("auth.imageAlts");

  return (
    <div className={`${style.login} min-h-screen w-full p-16 bg-[#F4F8FE]`}>
      <div className="login-card bg-white p-8 rounded-[40px] h-full">
        <Row gutter={[60, 60]} align="middle">
          <Col xs={24} md={12}>
            {children}
          </Col>

          <Col xs={24} md={12}>
            <div className="text-[#111113] min-h-[600px] relative !rounded-[40px] h-full w-full overflow-hidden">
              <Image
                src="/images/login.webp"
                objectFit="cover"
                fill
                alt={tAuth("sideImage")}
              />
              <Link href="/" className="absolute top-4 left-4">
                <Image
                  src="/images/logo-full-white.svg"
                  width={135}
                  height={30}
                  alt={tAuth("logo")}
                />
              </Link>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}
