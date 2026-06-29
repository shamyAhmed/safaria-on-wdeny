import { DiscoverAirplanComponent } from "@/components/discoverAirplan/DiscoverAirplanComponent";
import { LoaderS1 } from "@/components/tools/loaders/LoaderS1";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: "حجز الطيران",
};

const DiscoverAirplanPage: React.FC = (): JSX.Element => {
    return (
        <Suspense fallback={<LoaderS1 />}>
            <DiscoverAirplanComponent />
        </Suspense>
    );
};

export default DiscoverAirplanPage;
