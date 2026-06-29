import { CompaniesComponent } from "@/components/companies/CompaniesComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "الشركات",
};

const CompaniesPage: React.FC = (): JSX.Element => {
  return <CompaniesComponent />;
};

export default CompaniesPage;
