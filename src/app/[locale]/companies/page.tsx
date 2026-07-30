import { CompaniesComponent } from "@/components/companies/CompaniesComponent";
import { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata({ locale, path: "/companies", page: "companies" });
}

const CompaniesPage: React.FC = (): JSX.Element => {
  return <CompaniesComponent />;
};

export default CompaniesPage;
