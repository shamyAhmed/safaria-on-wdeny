"use client";
import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useSelector } from "react-redux";
import { RootState } from "@/store/appStore";

interface BookingHeaderProps {
    currentStep: number;
    totalPassengers?: number;
}

export const BookingHeader = ({ currentStep, totalPassengers = 1 }: BookingHeaderProps) => {
    const t = useTranslations("bookingPage.steps");
    const tPage = useTranslations("bookingPage");
    const tCard = useTranslations("airplaneCard");

    const CABIN_CLASS_KEY: Record<string, string> = {
      CABIN_CLASS_ECONOMY: "economy",
      CABIN_CLASS_PREMIUM_ECONOMY: "premiumEconomy",
      CABIN_CLASS_BUSINESS: "business",
      CABIN_CLASS_FIRST: "first",
    };
    const router = useRouter();
    const flight = useSelector((state: RootState) => state.flight.flight);

    const steps = [
        { key: "selectFlight" as const, num: 1 },
        { key: "passengerDetails" as const, num: 2 },
        { key: "payment" as const, num: 3 },
        { key: "ticket" as const, num: 4 },
    ];

    const firstLeg = flight?.legs[0];
    const route = firstLeg
        ? `${firstLeg.departureCity} - ${firstLeg.arrivalCity}`
        : "—";

    const date = firstLeg?.date ?? "—";
    const cabinClass = firstLeg?.class ?? "";

    return (
        <div className="flex items-center justify-between gap-4 mb-6 bg-white rounded-[20px] px-5 py-4 border border-gray-100 shadow-sm">
            {/* Flight info + back button */}
            <div className="flex items-center gap-4 shrink-0">
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="shrink-0 text-sm font-bold text-white px-8 py-3 rounded-[50px] hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: "#F47522" }}
                >
                    {tPage("back")}
                </button>
                <div className="text-right hidden sm:block">
                    <p className="font-bold text-[#333] text-sm leading-tight">{route}</p>
                    <p className="text-xs text-gray-400 mt-0.5">
                        {tPage("departed")}: {date}
                        {totalPassengers > 0 && <>&nbsp;·&nbsp;{tPage("passengerCount", { count: totalPassengers })}</>}
                        {cabinClass && <>&nbsp;·&nbsp;{tCard(`classOptions.${CABIN_CLASS_KEY[cabinClass] ?? "economy"}` as any)}</>}
                    </p>
                </div>
            </div>

            {/* Steps */}
            <div className="flex items-start gap-0 overflow-x-auto">
                {steps.map((step, idx) => {
                    const isActive = step.num === currentStep;
                    const isCompleted = step.num < currentStep;
                    const isLast = idx === steps.length - 1;
                    return (
                        <div key={step.num} className="flex items-center shrink-0">
                            <div className="flex flex-col items-center gap-1">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all
                                    ${isActive || isCompleted ? "bg-primary text-white" : "bg-gray-200 text-gray-500"}`}>
                                    {step.num}
                                </div>
                                <span className={`text-[11px] whitespace-nowrap text-center
                                    ${isActive ? "text-primary font-bold" : "text-gray-400"}`}>
                                    {t(step.key)}
                                </span>
                            </div>
                            {!isLast && (
                                <div className={`h-[2px] w-10 sm:w-16 mb-5 mx-1
                                    ${isCompleted ? "bg-primary" : "bg-gray-200"}`} />
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
