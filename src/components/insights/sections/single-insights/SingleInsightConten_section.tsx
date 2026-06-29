import { useLocale } from "next-intl";

interface Props {
  insight: {
    content: {
      en: string;
      ar?: string;
    };
  };
}

export const SingleInsightConten_section = ({ insight }: Props) => {
  const locale = useLocale();
  const isEnglish = locale === "en";

  if (!insight?.content?.en) return;

  return (
    <div className="container mb-40 mt-20">
      <div
        dangerouslySetInnerHTML={{
          __html: isEnglish ? insight?.content?.en : insight?.content?.ar || "",
        }}
      />
    </div>
  );
};
