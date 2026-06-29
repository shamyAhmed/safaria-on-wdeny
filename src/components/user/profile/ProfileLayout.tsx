"use client";

import { PageBannerSection } from "@/components/tools/sections/PageBannerSection";
import { ProfileSidebar } from "./ProfileSidebar";
import { Col, Row } from "antd";

interface ProfileLayoutProps {
  children: React.ReactNode;
  title: string;
  currentPage: string;
  currentLink: string;
}

export const ProfileLayout = ({
  children,
  title,
  currentPage,
  currentLink,
}: ProfileLayoutProps) => {
  return (
    <div className="min-h-screen bg-[#F9FAFB] pb-20">
      <PageBannerSection
        title={title}
        currentPage={currentPage}
        currentLink={currentLink}
      />

      <div className="container py-20 ">
        <div className="flex gap-6">
          <div className="w-[300px] hidden lg:block shrink-0">
            <ProfileSidebar />
          </div>
          <div className="flex-1 min-w-0">
            <div className="cardS1">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
