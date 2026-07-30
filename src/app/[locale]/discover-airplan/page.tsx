import { DiscoverAirplanComponent } from "@/components/discoverAirplan/DiscoverAirplanComponent";
import { LoaderS1 } from "@/components/tools/loaders/LoaderS1";
import { Metadata } from "next";
import { Suspense } from "react";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata({ locale, path: "/discover-airplan", page: "discoverAirplane" });
}

const DiscoverAirplanPage: React.FC = (): JSX.Element => {
    return (
        <Suspense fallback={<LoaderS1 />}>
            <DiscoverAirplanComponent />
        </Suspense>
    );
};

export default DiscoverAirplanPage;
