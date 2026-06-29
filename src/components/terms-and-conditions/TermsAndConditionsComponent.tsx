import { getPageData } from "@/apiCalls/getPageData";
import { TermsAndConditionsHeading } from "./sections/TermsAndConditionsHeading";

export const TermsAndConditionsComponent = async () => {
  const pageData = await getPageData("terms-and-conditions");
  const JSONData = JSON.parse(pageData?.page?.data || "{}");

  return (
    <div>
      <TermsAndConditionsHeading JSONData={JSONData} pageData={pageData} />
    </div>
  );
};
