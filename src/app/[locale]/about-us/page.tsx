import { AboutUsComponent } from "@/components/about-us/AboutUsComponent";
import { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata({ locale, path: "/about-us", page: "aboutUs" });
}

const AboutUsPage: React.FC = (): JSX.Element => {
  return <AboutUsComponent />;
};

export default AboutUsPage;
