import { InvoiceComponent } from "@/components/discoverAirplan/booking/invoice/InvoiceComponent";
import { LoaderS1 } from "@/components/tools/loaders/LoaderS1";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: "تذكرة الحجز",
};

const InvoicePage: React.FC = (): JSX.Element => {
    return (
        <Suspense fallback={<LoaderS1 />}>
            <InvoiceComponent />
        </Suspense>
    );
};

export default InvoicePage;
