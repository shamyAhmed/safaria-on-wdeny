import { LoaderS1 } from "@/components/tools/loaders/LoaderS1";
import { ConfirmationRewardComponent } from "@/components/user/confirmation-reward/ConfirmationRewardComponent";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "تأكيد المكافأه",
};

const AvilableRewardsPage: React.FC = (): JSX.Element => {
  return (
    <Suspense fallback={<LoaderS1 />}>
      <ConfirmationRewardComponent />
    </Suspense>
  );
};

export default AvilableRewardsPage;
