import { PrivacyPolicyComponent } from "@/components/privacy-policy/PrivacyPolicyComponent";
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
  return pageMetadata({ locale, path: "/privacy-policy", page: "privacyPolicy" });
}

const PrivacyPolicyPage: React.FC = (): JSX.Element => {
  return (
    <Suspense fallback={<LoaderS1 />}>
      <PrivacyPolicyComponent />
    </Suspense>
  );
};

export default PrivacyPolicyPage;
