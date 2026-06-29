import { FaqsComponent } from "@/components/faqs/FaqsComponent";
import { LoaderS1 } from "@/components/tools/loaders/LoaderS1";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "FAQs",
};

const FaqsPage: React.FC = (): JSX.Element => {
  return (
    <Suspense fallback={<LoaderS1 />}>
      <FaqsComponent />
    </Suspense>
  );
};

export default FaqsPage;
