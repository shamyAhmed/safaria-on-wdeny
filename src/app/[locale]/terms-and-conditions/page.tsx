import { TermsAndConditionsComponent } from "@/components/terms-and-conditions/TermsAndConditionsComponent";
import { LoaderS1 } from "@/components/tools/loaders/LoaderS1";
import { Metadata } from "next";
import { Suspense } from "react";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata({ locale, path: "/terms-and-conditions", page: "termsAndConditions" });
}

const TermsAndConditionsPage: React.FC = (): JSX.Element => {
  return (
    <Suspense fallback={<LoaderS1 />}>
      <TermsAndConditionsComponent />
    </Suspense>
  );
};

export default TermsAndConditionsPage;
