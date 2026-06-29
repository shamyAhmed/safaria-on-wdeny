import dayjs from "dayjs";
import { useLocale, useTranslations } from "next-intl";

interface PrivacyPolicyHeadingProps {
  pageData: {
    updated_at: string;
  };
  JSONData: {
    content_en: string;
    content_ar: string;
  };
}

export const PrivacyPolicyHeading = ({
  JSONData,
  pageData,
}: PrivacyPolicyHeadingProps) => {
  const t = useTranslations("privacyAndTerms");
  const locale = useLocale();

  const isEnglish = locale === "en";
  const sections = [
    {
      id: 1,
      title: "جمع المعلومات",
      content: [
        "نحن نجمع معلومات شخصية عندما تقوم بإنشاء حساب أو تقديم طلب. تتضمن هذه المعلومات الاسم والبريد الإلكتروني ورقم الهاتف والعنوان.",
        "قد نجمع أيضاً معلومات عن كيفية استخدامك لموقعنا، بما في ذلك صفحات الويب التي تزورها والمنتجات التي تعرضها.",
      ],
    },
    {
      id: 2,
      title: "استخدام المعلومات",
      content: [
        "نستخدم المعلومات التي نجمعها لمعالجة طلباتك وتقديم خدمات أفضل لك. كما قد نستخدمها لإرسال تحديثات حول المنتجات والعروض الجديدة.",
        "لن نشارك معلوماتك الشخصية مع أطراف ثالثة دون موافقتك الصريحة، باستثناء الحالات التي يقتضيها القانون.",
      ],
    },
    {
      id: 3,
      title: "أمان المعلومات",
      content: [
        "نحن نتخذ إجراءات أمنية مناسبة لحماية معلوماتك الشخصية من الوصول غير المصرح به أو التعديل أو الحذف.",
        "نستخدم تشفير بروتوكول HTTPS لضمان سلامة بيانات المستخدمين عند النقل عبر الإنترنت.",
      ],
    },
    {
      id: 4,
      title: "حقوق المستخدم",
      content: [
        "لديك الحق في الوصول إلى معلوماتك الشخصية والطلب على تصحيحها أو حذفها. يمكنك أيضاً الطلب على إيقاف معالجة بياناتك.",
        "يمكنك الاتصال بنا في أي وقت للتعرف على معلوماتك الشخصية أو لممارسة أي من حقوقك.",
      ],
    },
    {
      id: 5,
      title: "تحديثات هذه السياسة",
      content: [
        "قد نقوم بتحديث هذه السياسة من وقت لآخر. سيتم إخطارك بأي تغييرات جوهرية عبر البريد الإلكتروني أو عن طريق إشعار واضح على الموقع.",
        "يعتبر استمرارك في استخدام الموقع بعد التحديثات موافقة منك على السياسة الجديدة.",
      ],
    },
  ];
  return (
    <div className="privacy-terms-banner">
      <div className="container">
        <h1 className="text-center">{t("privacyTitle")}</h1>
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
  );
};
