import { LoaderS1 } from "@/components/tools/loaders/LoaderS1";
import { PointsHistoryComponent } from "@/components/user/points-history/PointsHistoryComponent";
import { Metadata } from "next";
import { Suspense } from "react";
import { privatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = privatePageMetadata("المكافئات المتاحة");

const AvilableRewardsPage: React.FC = (): JSX.Element => {
  return (
    <Suspense fallback={<LoaderS1 />}>
      <PointsHistoryComponent />
    </Suspense>
  );
};

export default AvilableRewardsPage;
