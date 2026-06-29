import { ContactUsComponent } from "@/components/contact-us/ContactUsComponent";
import { LoaderS1 } from "@/components/tools/loaders/LoaderS1";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "تواصل معنا",
};

const ContactUsPage: React.FC = (): JSX.Element => {
  return (
    <Suspense fallback={<LoaderS1 />}>
      <ContactUsComponent />
    </Suspense>
  );
};

export default ContactUsPage;
