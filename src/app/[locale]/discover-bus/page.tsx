import { DiscoverBusComponent } from "@/components/discoverBus/DiscoverBusComponent";
import { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata({ locale, path: "/discover-bus", page: "discoverBus" });
}

const DiscoverBusPage: React.FC = (): JSX.Element => {
    return <DiscoverBusComponent />;
};

export default DiscoverBusPage;
