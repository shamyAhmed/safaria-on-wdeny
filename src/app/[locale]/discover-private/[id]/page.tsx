"use client";

import { use, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store/appStore";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useGetUserProfile } from "@/hooks/auth/useGetProfile";
import { useTranslations } from "next-intl";

import useGetPrivateTripById from "./_hooks/useGetPrivateTripById";
import useCreatePrivateTicket from "./_hooks/useCreatePrivateTicket";
import { BookingPageSkeleton } from "./_components/BookingPageSkeleton";
import Image from "next/image";
import { MdOutlineLocationOn, MdDirectionsCar } from "react-icons/md";
import { FaChevronLeft } from "react-icons/fa6";
import { Button, Checkbox, DatePicker } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { DatePickerIcon } from "@/components/tools/icons/DatePickerIcon";
import { CurrencyLabel } from "@/components/discoverAirplan/CurrencyLabel";

// ── Page ──────────────────────────────────────────────────────────────────────

const DiscoverPrivatePage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const t = useTranslations("privateBooking");
  const currency = useSelector(
    (state: RootState) => state.currency.selected?.code ?? "",
  );
  const pickupLocation = useSelector((state: RootState) => state.privateTrip.pickupLocation);
  const destinationLocation = useSelector((state: RootState) => state.privateTrip.destinationLocation);
  const { isAuthenticated, isLoading: profileLoading } = useGetUserProfile();

  const {
    data: trip,
    isLoading: tripLoading,
    isError,
  } = useGetPrivateTripById(id);

  const isRound = searchParams.get("rounded") === "true";

  const [agreed, setAgreed] = useState(false);
  const [departureDate, setDepartureDate] = useState<Dayjs | null>(null);
  const [returnDate, setReturnDate] = useState<Dayjs | null>(null);

  const { mutate: createOrder, isPending: creatingOrder } =
    useCreatePrivateTicket();

  const handleProceedToPay = () => {
    if (!departureDate) return;
    const fromLat = searchParams.get("from_lat") ?? "";
    const fromLng = searchParams.get("from_lng") ?? "";
    const toLat = searchParams.get("to_lat") ?? "";
    const toLng = searchParams.get("to_lng") ?? "";

    createOrder({
      trip_id: id,
      rounded: isRound,
      departure: {
        latitude: fromLat,
        longitude: fromLng,
        date: departureDate.format("YYYY-MM-DD"),
      },
      destination: {
        latitude: toLat,
        longitude: toLng,
        ...(isRound && returnDate
          ? { date: returnDate.format("YYYY-MM-DD") }
          : {}),
      },
    });
  };

  // Redirect to the listing page if the trip fails to load or does not exist.
  useEffect(() => {
    if (!tripLoading && (isError || !trip)) {
      router.replace("/discover-private");
    }
  }, [tripLoading, isError, trip, router]);

  // Redirect unauthenticated users to login.
  useEffect(() => {
    if (profileLoading) return;
    if (!isAuthenticated) {
      const query = searchParams.toString();
      const fullPath = query ? `${pathname}?${query}` : pathname;
      router.replace({
        pathname: "/auth/login",
        query: { redirect: fullPath },
      });
    }
  }, [isAuthenticated, profileLoading, pathname, searchParams, router]);

  if (profileLoading || !isAuthenticated) return null;
  if (tripLoading) return <BookingPageSkeleton />;
  if (!trip) return null;

  const seatPrice = isRound ? trip.round_price : trip.go_price;
  const vehicleLabel = trip.vehicle.category_name || trip.vehicle.name;

  return (
    <div className="container p-6 space-y-4">
      {/* Company card */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm px-5 py-4 flex items-center gap-4">
        <div className="relative w-14 h-14 rounded-full overflow-hidden border border-gray-100 bg-gray-50 shrink-0">
          {trip.company.logo_url ? (
            <Image
              src={trip.company.logo_url}
              alt={trip.company.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <MdDirectionsCar size={26} className="text-gray-300" />
            </div>
          )}
        </div>
        <div>
          <p className="font-bold text-gray-900 text-base">{trip.company.name}</p>
          <p className="text-xs text-gray-400">{vehicleLabel}</p>
        </div>
      </div>

      {/* Route */}
      {(pickupLocation || destinationLocation) && (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm px-5 py-4 space-y-3">
          <p className="text-base font-bold text-gray-900">المسار</p>
          <div className="h-px bg-gray-100" />
          <div className="flex flex-col gap-3">
            {pickupLocation && (
              <div className="flex items-center gap-3">
                <MdOutlineLocationOn size={20} className="text-primary shrink-0" />
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">نقطة الانطلاق</p>
                  <p className="text-sm font-medium text-gray-800">{pickupLocation.text}</p>
                </div>
              </div>
            )}
            {destinationLocation && (
              <div className="flex items-center gap-3">
                <MdOutlineLocationOn size={20} className="text-green-500 shrink-0" />
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">الوجهة</p>
                  <p className="text-sm font-medium text-gray-800">{destinationLocation.text}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Payment details card */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm px-5 py-4 space-y-2">
        <p className="text-base font-bold text-gray-900">بيانات الدفع</p>

        <div className="h-px bg-gray-100" />

        <div className="flex items-center justify-between py-1">
          <span className="text-sm text-gray-500">سعر الرحلة</span>
          <span className="text-sm font-semibold text-gray-800">
            {seatPrice} <CurrencyLabel currency={currency} />
          </span>
        </div>

        <div className="flex items-center justify-between py-1">
          <span className="text-base font-bold text-gray-900">الإجمالي</span>
          <span className="text-lg font-bold text-primary">
            {seatPrice} <CurrencyLabel currency={currency} />
          </span>
        </div>
      </div>

      {/* Dates section */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm px-5 py-4 space-y-2">
        <p className="text-base font-bold text-gray-900">التواريخ</p>

        <div className="h-px bg-gray-100" />

        <div className="grid grid-cols-2 gap-4 pt-2">
          {/* Departure date */}
          <div className="space-y-2">
            <p className="text-sm font-bold text-gray-800">تاريخ المغادرة</p>
            <div className="inputS1">
              <DatePicker
                className="w-full"
                placeholder="اختر تاريخ المغادرة"
                suffixIcon={<DatePickerIcon />}
                value={departureDate}
                disabledDate={(current) =>
                  current && current < dayjs().add(1, "day").startOf("day")
                }
                onChange={(val) => {
                  setDepartureDate(val);
                  if (
                    returnDate &&
                    val &&
                    dayjs(returnDate).isBefore(dayjs(val).add(1, "day"), "day")
                  ) {
                    setReturnDate(null);
                  }
                }}
              />
            </div>
          </div>

          {/* Return date */}
          <div className="space-y-2">
            <p
              className={`text-sm font-bold ${isRound ? "text-gray-800" : "text-gray-400"}`}>
              تاريخ العودة
            </p>
            <div className={`inputS1 ${!isRound ? "disabled" : ""}`}>
              <DatePicker
                className="w-full"
                placeholder="اختر تاريخ العودة"
                suffixIcon={<DatePickerIcon />}
                disabled={!isRound}
                value={returnDate}
                defaultPickerValue={departureDate ?? undefined}
                disabledDate={(current) => {
                  const min = departureDate
                    ? dayjs(departureDate).add(1, "day").startOf("day")
                    : dayjs().add(2, "day").startOf("day");
                  return current && current < min;
                }}
                onChange={(val) => setReturnDate(val)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Confirm section */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm px-5 py-4 space-y-3">
        <div className="flex items-center gap-2">
          <Checkbox checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
          <span className="text-sm text-gray-600">
            الموافقة على{" "}
            <span className="text-primary cursor-pointer underline">
              الشروط والأحكام
            </span>
          </span>
        </div>
        <Button
          type="primary"
          block
          loading={creatingOrder}
          disabled={!agreed || !departureDate || (isRound && !returnDate)}
          onClick={handleProceedToPay}
          className="!rounded-xl !h-12 !text-base !font-bold">
          {t("proceedToPay")}
        </Button>
      </div>
    </div>
  );
};

export default DiscoverPrivatePage;
