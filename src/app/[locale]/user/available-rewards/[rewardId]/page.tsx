import { LoaderS1 } from "@/components/tools/loaders/LoaderS1";
import { ConfirmationRewardComponent } from "@/components/user/confirmation-reward/ConfirmationRewardComponent";
import { Metadata } from "next";
import { Suspense } from "react";
import { privatePageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return privatePageMetadata("confirmReward", locale);
}

const AvilableRewardsPage: React.FC = (): JSX.Element => {
  return (
    <Suspense fallback={<LoaderS1 />}>
      <ConfirmationRewardComponent />
    </Suspense>
  );
};

export default AvilableRewardsPage;
