import { AboutUsComponent } from "@/components/about-us/AboutUsComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
};

const AboutUsPage: React.FC = (): JSX.Element => {
  return <AboutUsComponent />;
};

export default AboutUsPage;
