import { IndexComponent } from "@/components/homePage/IndexComponent";
import { HeroSection } from "@/components/homePage/sections/HeroSection";
import { Metadata } from "next";
import style from "@/components/homePage/styles/homePage.module.scss";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  // absoluteTitle: the home title already carries the brand, so skip the template.
  return pageMetadata({ locale, path: "", page: "home", absoluteTitle: true });
}

const HomePage: React.FC = (): JSX.Element => {
  return (
    <div className={style.homePage}>
      <HeroSection />
      <IndexComponent />
    </div>
  );
};

export default HomePage;
