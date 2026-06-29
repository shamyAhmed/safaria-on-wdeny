import { DiscoverComponent } from "@/components/discover/DiscoverComponent";
import { LoaderS1 } from "@/components/tools/loaders/LoaderS1";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "استكشف",
};

const DiscoverPage: React.FC = (): JSX.Element => {
  return (
    <Suspense fallback={<LoaderS1 />}>
      <DiscoverComponent />
    </Suspense>
  );
};

export default DiscoverPage;
