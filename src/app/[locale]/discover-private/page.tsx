import { DiscoverPrivateComponent } from "@/components/discoverPrivate/DiscoverPrivateComponent";
import { LoaderS1 } from "@/components/tools/loaders/LoaderS1";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "رحلات خاصة",
};

const DiscoverPrivatePage: React.FC = (): JSX.Element => {
  return (
    <Suspense fallback={<LoaderS1 />}>
      <DiscoverPrivateComponent />
    </Suspense>
  );
};

export default DiscoverPrivatePage;
