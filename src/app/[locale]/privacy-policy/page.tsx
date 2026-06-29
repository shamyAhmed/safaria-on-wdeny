import { PrivacyPolicyComponent } from "@/components/privacy-policy/PrivacyPolicyComponent";
import { LoaderS1 } from "@/components/tools/loaders/LoaderS1";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

const PrivacyPolicyPage: React.FC = (): JSX.Element => {
  return (
    <Suspense fallback={<LoaderS1 />}>
      <PrivacyPolicyComponent />
    </Suspense>
  );
};

export default PrivacyPolicyPage;
