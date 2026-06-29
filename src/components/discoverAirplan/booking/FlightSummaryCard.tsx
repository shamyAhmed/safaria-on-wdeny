"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/store/appStore";
import { FlightInfo } from "@/components/discoverAirplan/cards/AirplaneCard";

export const FlightSummaryCard = () => {
    const flight = useSelector((state: RootState) => state.flight.flight);

    if (!flight) return null;

    return (
        <div className="bg-white rounded-[20px] overflow-hidden border border-gray-100 shadow-sm mb-4">
            <div className="px-5 pt-2 pb-4">
                {flight.legs.map((leg, idx) => {
                    // Get the logo and name from the first segment of the matching journey
                    const journey = flight.journeys?.[idx];
                    const firstSeg = journey?.segment?.[0];
                    const logoFromSeg =
                        firstSeg?.operatingCarrierLogo ??
                        (firstSeg ? `https://pics.avs.io/200/200/${firstSeg.operatingCarrierCode}.png` : flight.airlineLogo);
                    const nameFromSeg = firstSeg?.operatingCarrierName ?? flight.airline;

                    return (
                        <FlightInfo
                            key={idx}
                            airline={nameFromSeg}
                            airlineLogo={logoFromSeg}
                            flightNumber={leg.flightNumber}
                            flightClass={leg.class}
                            stops={leg.stops}
                            flightInfo={leg}
                            isReturn={leg.isReturn}
                        />
                    );
                })}
            </div>
        </div>
    );
};
