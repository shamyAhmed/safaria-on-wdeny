import { DiscoverBusComponent } from "@/components/discoverBus/DiscoverBusComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "حجز الباص",
};

const DiscoverBusPage: React.FC = (): JSX.Element => {
    return <DiscoverBusComponent />;
};

export default DiscoverBusPage;
