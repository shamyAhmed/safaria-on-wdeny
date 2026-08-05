"use client";

import { Collapse } from "antd";
import { PageBannerSection } from "../tools/sections/PageBannerSection";
import style from "./styles/faqs.module.scss";
import { useTranslations } from "next-intl";
import { FiChevronDown, FiHelpCircle } from "react-icons/fi";
import useGetFaqs from "@/app/[locale]/_hooks/useGetFaqs";

const { Panel } = Collapse;

export const FaqsComponent: React.FC = () => {
  const t = useTranslations("faqs");
  const { data: sections = [], isLoading } = useGetFaqs();

  return (
    <div className={style.faqs}>
      <PageBannerSection
        title={t("banner.title")}
        currentLink="/faqs"
        currentPage={t("banner.breadcrumb")}
      />

      <section className="faqs-section">
        <div className="container">
          <div className="faqs-header">
            <h2 className="section-title">{t("section.title")}</h2>
            <p className="section-subtitle">{t("section.subtitle")}</p>
          </div>

          {!isLoading && (
            sections.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-5">
                  <FiHelpCircle className="text-4xl text-gray-300" />
                </div>
                <h3 className="text-lg font-semibold text-gray-600 mb-2">{t("empty.title")}</h3>
                <p className="text-sm text-gray-400 max-w-xs">{t("empty.description")}</p>
              </div>
            ) : (
              <div className="faqs-categories">
                {sections.map((section, sectionIdx) => (
                  <div key={sectionIdx} className="faq-category">
                    <h3 className="category-title">
                      <span className="category-dot" />
                      {section.section_name}
                    </h3>
                    <Collapse
                      accordion
                      ghost
                      expandIcon={({ isActive }) => (
                        <FiChevronDown
                          className={`expand-icon ${isActive ? "active" : ""}`}
                        />
                      )}
                      expandIconPosition="end"
                      className="faq-collapse"
                    >
                      {section.faq.map((item, idx) => (
                        <Panel
                          header={item.question}
                          key={`${sectionIdx}-${idx}`}
                          className="faq-panel"
                        >
                          <p>{item.answer}</p>
                        </Panel>
                      ))}
                    </Collapse>
                  </div>
                ))}
              </div>
            )
          )}

          <div className="faqs-cta">
            <p>{t("cta.text")}</p>
            <a href="/contact-us" className="cta-btn">
              {t("cta.button")}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
