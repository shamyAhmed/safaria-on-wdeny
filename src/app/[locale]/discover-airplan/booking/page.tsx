import { BookingComponent } from "@/components/discoverAirplan/booking/BookingComponent";
import { LoaderS1 } from "@/components/tools/loaders/LoaderS1";
import { Metadata } from "next";
import { Suspense } from "react";
import { privatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = privatePageMetadata("تفاصيل الركاب");

const BookingPage: React.FC = (): JSX.Element => {
    return (
        <Suspense fallback={<LoaderS1 />}>
            <BookingComponent />
        </Suspense>
    );
};

export default BookingPage;
