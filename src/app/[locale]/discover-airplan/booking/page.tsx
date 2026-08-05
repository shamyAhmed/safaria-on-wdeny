import { BookingComponent } from "@/components/discoverAirplan/booking/BookingComponent";
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
  return privatePageMetadata("passengerDetails", locale);
}

const BookingPage: React.FC = (): JSX.Element => {
    return (
        <Suspense fallback={<LoaderS1 />}>
            <BookingComponent />
        </Suspense>
    );
};

export default BookingPage;
