"use client";
import { Modal, Button } from "antd";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { FaPlane, FaSuitcase, FaInfoCircle } from "react-icons/fa";
import { MdOutlinePriceCheck } from "react-icons/md";
import { FlightTimelineTab } from "./tabs/FlightTimelineTab";
import { PriceSummaryTab } from "./tabs/PriceSummaryTab";
import { PriceRulesTab } from "./tabs/PriceRulesTab";
import { BaggageDetailsTab } from "./tabs/BaggageDetailsTab";
import { useTranslations } from "next-intl";

interface FlightDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    flight: any;
}

export const FlightDetailsModal = ({ isOpen, onClose, flight }: FlightDetailsModalProps) => {
    const [activeTab, setActiveTab] = useState<"timeline" | "summary" | "rules" | "baggage">("timeline");
    const t = useTranslations("flightModal.tabs");
    const haveBundles: boolean = flight?.haveBundles ?? true;

    const tabs = [
        { id: "timeline", label: t("timeline"), icon: <FaPlane /> },
        { id: "summary", label: t("summary"), icon: <MdOutlinePriceCheck /> },
        { id: "rules", label: t("rules"), icon: <FaInfoCircle /> },
        ...(!haveBundles ? [{ id: "baggage", label: t("baggage"), icon: <FaSuitcase /> }] : []),
    ];

    const rulesAndPenalties: string[] = flight?.priceClasses?.[0]?.rulesAndPenalties ?? [];

    const renderContent = () => {
        switch (activeTab) {
            case "timeline": return <FlightTimelineTab flight={flight} />;
            case "summary": return <PriceSummaryTab flight={flight} />;
            case "rules": return <PriceRulesTab flight={flight} />;
            case "baggage": return (
                <div className="baggage-details p-6">
                    <div className="flex flex-col gap-4">
                        {rulesAndPenalties.map((rule, idx) => (
                            <div key={idx} className="text-sm text-[#333] text-left" dir="ltr">{rule}</div>
                        ))}
                    </div>
                </div>
            );
            default: return null;
        }
    };

    return (
        <Modal
            open={isOpen}
            onCancel={onClose}
            footer={null}
            closeIcon={<IoClose className="text-2xl" />}
            width={1000}
            className="flight-details-modal"
            centered
        >
            <div className="pt-8 px-4">
                {/* Tab Navigation */}
                <div className="flex items-center gap-4 mb-10 pb-6 border-b border-gray-100 overflow-x-auto scrollbar-hide">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`flex shrink-0 items-center gap-2 px-6 py-3 rounded-full font-bold transition-all ${activeTab === tab.id
                                    ? "bg-primary text-white shadow-lg"
                                    : "bg-[#D9D9D9] text-[#666] hover:bg-gray-300"
                                }`}
                        >
                            <span className="text-xl">{tab.icon}</span>
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Modal Content */}
                <div className="modal-content-area min-h-[400px]">
                    {renderContent()}
                </div>
            </div>
        </Modal>
    );
};
