import { IndexComponent } from "@/components/homePage/IndexComponent";
import { LoaderS1 } from "@/components/tools/loaders/LoaderS1";
import { AvailableRewardsComponent } from "@/components/user/available-rewards/AvailableRewardsComponent";
import { Metadata } from "next";
import { Suspense } from "react";
import { privatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = privatePageMetadata("المكافئات المتاحة");

const AvilableRewardsPage: React.FC = (): JSX.Element => {
  return (
    <Suspense fallback={<LoaderS1 />}>
      <AvailableRewardsComponent />
    </Suspense>
  );
};

export default AvilableRewardsPage;
