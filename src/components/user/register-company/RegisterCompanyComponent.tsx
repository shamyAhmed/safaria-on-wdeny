"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { HiOutlineUser } from "react-icons/hi2";
// HiOutlineOfficeBuilding is still used by the tab icon above
import { RegisterCompany_form } from "./forms/RegisterCompany_form";
import { RegisterCompanyInfo_form } from "./forms/RegisterCompanyInfo_form";

type Tab = "company" | "account";

export const RegisterCompanyComponent = () => {
  const [activeTab, setActiveTab] = useState<Tab>("account");
  const t = useTranslations("auth.registerCompany");

  return (
    <div className="w-full flex flex-col">
      {/* Heading */}
      <h2 className="text-2xl font-bold text-[#111113] mb-3">{t("title")}</h2>
      <p className="text-[#B0B0B3] mb-8 text-sm">{t("description")}</p>

      {/* Tab toggle */}
      <div className="flex items-center bg-[#F4F8FE] rounded-full p-1 mb-8 gap-1">
        {(["account", "company"] as Tab[]).map((tab) => {
          const isActive = activeTab === tab;
          const Icon = tab === "company" ? HiOutlineOfficeBuilding : HiOutlineUser;
          return (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-full text-sm font-semibold transition-all duration-200 ${
                isActive
                  ? "bg-primary/10 text-[#111113]"
                  : "text-[#707070] hover:text-[#555]"
              }`}
            >
              <span
                className={`flex items-center justify-center rounded-full text-lg transition-all duration-200 ${
                  isActive
                    ? "bg-primary text-white w-8 h-8"
                    : "w-8 h-8"
                }`}
              >
                <Icon className="flex-shrink-0" />
              </span>
              <span>{t(`tabs.${tab === "company" ? "companyInfo" : "accountInfo"}`)}</span>
            </button>
          );
        })}</div>

      {/* Panel content — both panels share the same grid cell to prevent layout shifts */}
      <div className="grid [grid-template-columns:1fr] [grid-template-rows:1fr]">
        <div className={`[grid-area:1/1] transition-all duration-200 ${activeTab === "account" ? "visible" : "invisible"}`}>
          <RegisterCompany_form />
        </div>
        <div className={`[grid-area:1/1] transition-all duration-200 ${activeTab === "company" ? "visible" : "invisible"}`}>
          <RegisterCompanyInfo_form />
        </div>
      </div>
    </div>
  );
};
