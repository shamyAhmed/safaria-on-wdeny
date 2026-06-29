import { getPageData } from "@/apiCalls/getPageData";
import { PrivacyPolicyHeading } from "./sections/PrivacyPolicyHeading";

export const PrivacyPolicyComponent = async () => {
  const pageData = await getPageData("privacy-policy");
  const JSONData = JSON.parse(pageData?.page?.data || "{}");

  return (
    <div>
      <PrivacyPolicyHeading JSONData={JSONData} pageData={pageData} />
    </div>
  );
};
