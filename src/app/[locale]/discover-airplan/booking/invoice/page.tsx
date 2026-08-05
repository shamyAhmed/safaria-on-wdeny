import { InvoiceComponent } from "@/components/discoverAirplan/booking/invoice/InvoiceComponent";
import { LoaderS1 } from "@/components/tools/loaders/LoaderS1";
import { Metadata } from "next";
import { Suspense } from "react";
import { privatePageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return privatePageMetadata("bookingTicket", locale);
}

const InvoicePage: React.FC = (): JSX.Element => {
    return (
        <Suspense fallback={<LoaderS1 />}>
            <InvoiceComponent />
        </Suspense>
    );
};

export default InvoicePage;
