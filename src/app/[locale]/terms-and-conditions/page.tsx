import { TermsAndConditionsComponent } from "@/components/terms-and-conditions/TermsAndConditionsComponent";
import { LoaderS1 } from "@/components/tools/loaders/LoaderS1";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Terms and Conditions ",
};

const TermsAndConditionsPage: React.FC = (): JSX.Element => {
  return (
    <Suspense fallback={<LoaderS1 />}>
      <TermsAndConditionsComponent />
    </Suspense>
  );
};

export default TermsAndConditionsPage;
