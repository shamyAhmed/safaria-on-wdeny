import { IndexComponent } from "@/components/homePage/IndexComponent";
import { LoaderS1 } from "@/components/tools/loaders/LoaderS1";
import { AvailableRewardsComponent } from "@/components/user/available-rewards/AvailableRewardsComponent";
import { Metadata } from "next";
import { Suspense } from "react";
import { privatePageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return privatePageMetadata("availableRewards", locale);
}

const AvilableRewardsPage: React.FC = (): JSX.Element => {
  return (
    <Suspense fallback={<LoaderS1 />}>
      <AvailableRewardsComponent />
    </Suspense>
  );
};

export default AvilableRewardsPage;
