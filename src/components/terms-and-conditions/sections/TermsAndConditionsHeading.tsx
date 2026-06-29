import dayjs from "dayjs";
import { useLocale, useTranslations } from "next-intl";

interface TermsAndConditionsHeadingProps {
  pageData: {
    updated_at: string;
  };
  JSONData: {
    content_en: string;
    content_ar: string;
  };
}

export const TermsAndConditionsHeading = ({
  JSONData,
  pageData,
}: TermsAndConditionsHeadingProps) => {
  const t = useTranslations("privacyAndTerms");
  const locale = useLocale();

  const isEnglish = locale === "en";
  const sections = [
    {
      id: 1,
      title: "تحقق من الطلب عند استلامة",
      content: [
        "توريس بسياسات نحو بشكل معينة في الدلالة في الشكل وابس الحديثي وتستخدم في صناعات المطابع ودور النشر الآن.",
        "قائمة معدودة برمج مجموعة من الحروف بشكل عشوائي أدها من منتج معدل من منتج بشكل ديل وبمثابة حائط يتكون كتاب بمثابة حائط يتحقق بشكل ديل.",
      ],
    },
    {
      id: 2,
      title: "اتصل بنا في غضون ساعة واحدة من استلام طلبك",
      content: [
        "توريس بسياسات نحو بشكل معينة في الدلالة في الشكل وابس الحديثي وتستخدم في صناعات المطابع ودور النشر الآن.",
        "قائمة معدودة برمج مجموعة من الحروف بشكل عشوائي أدها من منتج معدل.",
        "قائمة معدودة برمج مجموعة من الحروف بشكل عشوائي أدها من منتج معدل.",
      ],
    },
    {
      id: 3,
      title: "سياسات نادي الطالبي",
      content: [
        "توريس بسياسات نحو بشكل معينة في الدلالة في الشكل وابس الحديثي وتستخدم في صناعات المطابع ودور النشر الآن.",
        "قائمة معدودة برمج مجموعة من الحروف بشكل عشوائي أدها من منتج معدل من منتج بشكل ديل وبمثابة حائط يتكون كتاب بمثابة حائط يتحقق بشكل ديل.",
      ],
    },
  ];
  return (
    <>
      <div className="privacy-terms-banner">
        <div className="container">
          <h1 className="text-center">{t("TermsTitle")}</h1>
          <p className="mb-24  text-center">
            لوريم إيبسوم هو ببساطة نص شكلي بمعنى أن الغاية هي الشكل وليس المحتوى
            ويُستخدم في صناعات المطابع ودور النشر.
          </p>

          <div className="space-y-12">
            {sections.map((section) => (
              <div key={section.id} className="">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                  {section.id}. {section.title}
                </h2>
                <div className="space-y-4">
                  {section.content.map((paragraph, idx) => (
                    <p
                      key={idx}
                      className="text-gray-700 leading-relaxed text-sm md:text-base"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
