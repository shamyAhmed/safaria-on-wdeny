import { getTranslations } from "next-intl/server";
import { Row, Col } from "antd";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import style from "@/components/user/login/styles/login.module.scss";

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
                src="/images/login.png"
                objectFit="cover"
                fill
                alt={tAuth("sideImage")}
              />
              <Link href="/" className="absolute top-4 left-4">
                <Image
                  src="/images/logo-white.png"
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
