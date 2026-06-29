import { CompaniesComponent } from "@/components/companies/CompaniesComponent";
import { SingleCompanyComponent } from "@/components/companies/single-company/SingleCompanyComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "الشركات",
};

const SingleCompanyPage: React.FC = (): JSX.Element => {
  return <SingleCompanyComponent />;
};

export default SingleCompanyPage;
