"use client";
import { Col, Row } from "antd";
import { useLocale, useTranslations } from "next-intl";
import { HomeSection } from "../HomeSection";
import { FeatureGridBlockData } from "@/app/[locale]/_types/SiteBlocks";
import { pickText } from "@/utils/localizedText";
import { CmsImage } from "@/components/common/CmsImage";

/** Pair the cards up; a trailing odd card gets a centred row of its own. */
const toRows = <T,>(items: T[]): T[][] =>
  items.reduce<T[][]>((rows, item, index) => {
    if (index % 2 === 0) rows.push([item]);
    else rows[rows.length - 1].push(item);
    return rows;
  }, []);

export const AllInOneAppSection = ({ data }: { data: FeatureGridBlockData }) => {
  const t = useTranslations("homePage.allInOneApp");
  const locale = useLocale();

  const features = (data.items ?? []).map((item, index) => ({
    key: index,
    title: pickText(item.title, locale),
    description: pickText(item.description, locale),
  }));

  if (features.length === 0) return null;

  const rows = toRows(features);
  // The cards are translucent white, which only reads over a photo. With the
  // backdrop still unset they need to become solid to stay legible.
  const hasBackground = Boolean(data.background?.trim());
  const cardClass = hasBackground
    ? "bg-white/15 text-white"
    : "bg-white text-gray-600 shadow-sm";
  const cardTitleClass = hasBackground ? "text-white" : "text-primary";

  return (
    <HomeSection
      title={pickText(data.title, locale)}
      description={pickText(data.description, locale)}
      className="features-section">
      <div className="container">
        <div className="all-features py-20 px-8">
          <CmsImage
            src={data.background}
            alt={t("imageAlt")}
            fill
            loading="lazy"
            className="object-cover -z-10"
            placeholderClassName="-z-10"
            placeholderIconClassName="text-5xl"
            showPlaceholderLabel={false}
          />
          <div className="relative z-1">
            {rows.map((row, rowIndex) => {
              const isLastRow = rowIndex === rows.length - 1;
              // Rows alternate between centred and pushed to the outer edges.
              const spread = rowIndex % 2 === 1;

              if (row.length === 1) {
                return (
                  <div
                    key={row[0].key}
                    className={`max-w-[346px] ${cardClass} p-4 mx-auto rounded-xl text-center ${
                      isLastRow ? "" : "mb-24"
                    }`}>
                    <h3 className={`font-bold text-2xl mb-4 ${cardTitleClass}`}>
                      {row[0].title}
                    </h3>
                    <p className="w-[90%]">{row[0].description}</p>
                  </div>
                );
              }

              return (
                <Row
                  key={`feature-row-${rowIndex}`}
                  align="middle"
                  justify="center"
                  gutter={[0, 20]}
                  className={isLastRow ? "" : "mb-24"}>
                  {row.map((feature, columnIndex) => (
                    <Col
                      key={feature.key}
                      xs={24}
                      md={12}>
                      <div
                        className={`max-w-[346px] ${cardClass} p-4 rounded-xl text-center ${
                          spread
                            ? columnIndex === 0
                              ? "me-auto"
                              : "ms-auto"
                            : "mx-auto"
                        }`}>
                        <h3 className={`font-bold text-2xl mb-4 ${cardTitleClass}`}>
                          {feature.title}
                        </h3>
                        <p className="w-[90%]">{feature.description}</p>
                      </div>
                    </Col>
                  ))}
                </Row>
              );
            })}
          </div>
        </div>
      </div>
    </HomeSection>
  );
};
