"use client";
import { Button, Col, Row } from "antd";
import { Link } from "@/i18n/navigation";
import { FaHome } from "react-icons/fa";
import { CompanyCard } from "@/components/companies/cards/CompanyCard";

export const CompaniesComponent = () => {
  const companies = [
    { id: 1, companyLogo: "/photos/nowrasbus-logo.png", company: "نورس باص" },
    { id: 2, companyLogo: "/photos/nowrasbus-logo.png", company: "نورس باص" },
    { id: 3, companyLogo: "/photos/nowrasbus-logo.png", company: "نورس باص" },
    { id: 3, companyLogo: "/photos/nowrasbus-logo.png", company: "نورس باص" },
  ];
  const images = [
    "/photos/blue-bus.png",
    "/photos/blue-bus.png",
    "/photos/blue-bus.png",
  ];
  return (
    <div className="bg-[#F7F7F7] py-8">
      <div className="container ">
        {/* Breadcrumb */}
        <div className="bg-white rounded-[40px] p-4 mb-6 text-sm text-gray-500 flex items-center gap-2">
          <Link
            href="/"
            className="underline font-bold text-[#333] hover:text-[#333] flex items-center gap-2"
          >
            <FaHome className="text-lg" />
            الرئيسية
          </Link>
          <span>-</span>

          <span className="text-[#89878F] font-medium">الشركات </span>
        </div>

        <div className="bg-white rounded-[40px] p-8">
          <h1 className="mb-6 text-2xl md:text-3xl font-bold text-primary">
            شركات النقل والسفر
          </h1>
          <Row gutter={[24, 24]}>
            {companies?.map((company) => (
              <Col xs={24} md={8}>
                <CompanyCard
                  companyId={company.id}
                  companyName={company.company}
                  companyLogo={company.companyLogo}
                  images={images}
                  detailsLabel="تفاصيل اكتر"
                  isArabic={true}
                />
              </Col>
            ))}
          </Row>
          <div className="flex justify-center mt-12">
            <Button type="primary" className="w-[180x]">
              عرض المزيد
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
