import { LoyalityProgramComponent } from "@/components/loyality/LoyalityProgramComponent";
import { LoaderS1 } from "@/components/tools/loaders/LoaderS1";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "برنامج ولاء الطائي",
};

const LoyalityProgramPage: React.FC = (): JSX.Element => {
  return (
    <Suspense fallback={<LoaderS1 />}>
      <LoyalityProgramComponent />
    </Suspense>
  );
};

export default LoyalityProgramPage;
