"use client";
import { Button, Col, DatePicker, Form, Radio, Row, TimePicker } from "antd";
import { FaSearch } from "react-icons/fa";
import { useTranslations } from "next-intl";
import { useWatch } from "antd/es/form/Form";
import { useRouter } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/appStore";
import { APIProvider } from "@vis.gl/react-google-maps";
import { PrivatePlacesInput } from "./PrivatePlacesInput";
import { DatePickerIcon } from "@/components/tools/icons/DatePickerIcon";
import {
  setPickupLocation,
  setDestinationLocation,
} from "@/store/slices/private/privateTripSlice";
import { useEffect } from "react";
import dayjs from "dayjs";
import {
  PRIVATE_DATE_FORMAT,
  PRIVATE_TIME_FORMAT,
  mergeDateAndTime,
} from "@/utils/privateTripDateTime";

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!;

const range = (start: number, end: number) =>
  Array.from({ length: end - start }, (_, i) => start + i);

export const PrivetTripsForm = ({ readonly = false }: { readonly?: boolean }) => {
  const [form] = Form.useForm();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const searchParams = useSearchParams();
  const t = useTranslations("homePage.privateTripsForm");

  const pickupLocation = useSelector(
    (state: RootState) => state.privateTrip.pickupLocation,
  );
  const destinationLocation = useSelector(
    (state: RootState) => state.privateTrip.destinationLocation,
  );

  // On the readonly listing page, initialise the form from the URL.
  useEffect(() => {
    const rounded = searchParams.get("rounded");
    if (rounded == null) return;

    const date = searchParams.get("date");
    const time = searchParams.get("time");
    const returnDate = searchParams.get("return_date");
    const returnTime = searchParams.get("return_time");

    // A bare "12:00" has no natively parsable date, so each time is restored
    // alongside its own date and the picker reads back only the time part.
    form.setFieldsValue({
      tripType: rounded === "true" ? "round_trip" : "one",
      ...(date ? { date: dayjs(date) } : {}),
      ...(date && time ? { time: dayjs(`${date} ${time}`) } : {}),
      ...(returnDate ? { returnDate: dayjs(returnDate) } : {}),
      ...(returnDate && returnTime
        ? { returnTime: dayjs(`${returnDate} ${returnTime}`) }
        : {}),
    });
  }, []);

  const tripType = useWatch("tripType", form);
  const isRound = tripType === "round_trip";

  const date = useWatch("date", form);
  const time = useWatch("time", form);
  const returnDate = useWatch("returnDate", form);
  const returnTime = useWatch("returnTime", form);

  // The API compares the two legs as full timestamps, not as days, so a return
  // earlier in the day than the departure is rejected with 400.
  const departureAt = date && time ? mergeDateAndTime(date, time) : null;
  const returnAt =
    returnDate && returnTime ? mergeDateAndTime(returnDate, returnTime) : null;

  const isFormValid =
    !!pickupLocation &&
    !!destinationLocation &&
    !!departureAt &&
    (!isRound || (!!returnAt && !returnAt.isBefore(departureAt)));

  const isBeforeDepartureDay = (candidate: dayjs.Dayjs) =>
    !!date && candidate.isBefore(dayjs(date).startOf("day"));

  const isReturningOnDepartureDay = () =>
    !!date && !!returnDate && dayjs(returnDate).isSame(dayjs(date), "day");

  // On a same-day return, hide the clock readings that precede the departure.
  const disabledReturnTime = () => {
    if (!time || !isReturningOnDepartureDay()) return {};
    return {
      disabledHours: () => range(0, dayjs(time).hour()),
      disabledMinutes: (hour: number) =>
        hour === dayjs(time).hour() ? range(0, dayjs(time).minute()) : [],
    };
  };

  // A later departure can strand an already-picked return; drop it rather than
  // let the form carry a combination the API will reject.
  const clearReturnTimeIfBeforeDeparture = () => {
    const nextDeparture =
      form.getFieldValue("date") && form.getFieldValue("time")
        ? mergeDateAndTime(form.getFieldValue("date"), form.getFieldValue("time"))
        : null;
    const nextReturn =
      form.getFieldValue("returnDate") && form.getFieldValue("returnTime")
        ? mergeDateAndTime(
            form.getFieldValue("returnDate"),
            form.getFieldValue("returnTime"),
          )
        : null;
    if (nextDeparture && nextReturn && nextReturn.isBefore(nextDeparture)) {
      form.setFieldValue("returnTime", null);
    }
  };

  const handleSearch = () => {
    if (!isFormValid || !pickupLocation || !destinationLocation) return;
    if (!departureAt || (isRound && !returnAt)) return;

    const query = new URLSearchParams();
    query.set("from_lat", String(pickupLocation.lat));
    query.set("from_lng", String(pickupLocation.lng));
    query.set("to_lat", String(destinationLocation.lat));
    query.set("to_lng", String(destinationLocation.lng));
    query.set("rounded", isRound ? "true" : "false");
    query.set("date", departureAt.format(PRIVATE_DATE_FORMAT));
    query.set("time", departureAt.format(PRIVATE_TIME_FORMAT));
    if (isRound && returnAt) {
      query.set("return_date", returnAt.format(PRIVATE_DATE_FORMAT));
      query.set("return_time", returnAt.format(PRIVATE_TIME_FORMAT));
    }

    router.push(`/discover-private?${query.toString()}`);
  };

  return (
    <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSearch}
        autoComplete="off"
        name="privateTripsForm"
      >
        <Row gutter={[16, 16]} align="stretch">
          {/* محطة التحرك */}
          <Col xs={24} md={12} lg={10}>
            <PrivatePlacesInput
              label={t("fields.from.label")}
              placeholder={t("fields.departure.placeholder")}
              value={pickupLocation}
              onSelect={(loc) => dispatch(setPickupLocation(loc))}
              readonly={readonly}
            />
          </Col>

          {/* محطة الوصول */}
          <Col xs={24} md={12} lg={10}>
            <PrivatePlacesInput
              label={t("fields.to.label")}
              placeholder={t("fields.arrival.placeholder")}
              value={destinationLocation}
              onSelect={(loc) => dispatch(setDestinationLocation(loc))}
              readonly={readonly}
            />
          </Col>
        </Row>

        <Row gutter={[16, 16]} align="stretch" className="mt-4">
          {/* تاريخ التحرك */}
          <Col xs={24} md={12} lg={6}>
            <div className="inputS1">
              <Form.Item label={t("fields.departureDate.label")} name="date">
                <DatePicker
                  className="w-full"
                  placeholder={t("fields.departureDate.placeholder")}
                  suffixIcon={<DatePickerIcon />}
                  disabled={readonly}
                  inputReadOnly={readonly}
                  disabledDate={(current) =>
                    current && current < dayjs().startOf("day")
                  }
                  onChange={(val) => {
                    if (!val) return;
                    // Keep the return leg from falling behind a later departure.
                    if (
                      returnDate &&
                      dayjs(returnDate).isBefore(dayjs(val).startOf("day"))
                    ) {
                      form.setFieldValue("returnDate", null);
                    }
                    clearReturnTimeIfBeforeDeparture();
                  }}
                />
              </Form.Item>
            </div>
          </Col>

          {/* وقت التحرك */}
          <Col xs={24} md={12} lg={6}>
            <div className="inputS1">
              <Form.Item label={t("fields.departureTime.label")} name="time">
                <TimePicker
                  className="w-full"
                  placeholder={t("fields.departureTime.placeholder")}
                  format={PRIVATE_TIME_FORMAT}
                  minuteStep={5}
                  showNow={false}
                  needConfirm={false}
                  disabled={readonly}
                  inputReadOnly={readonly}
                  onChange={clearReturnTimeIfBeforeDeparture}
                />
              </Form.Item>
            </div>
          </Col>

          {/* تاريخ ووقت العودة — ذهاب وعودة فقط */}
          {isRound && (
            <>
              <Col xs={24} md={12} lg={6}>
                <div className="inputS1">
                  <Form.Item
                    label={t("fields.returnDate.label")}
                    name="returnDate">
                    <DatePicker
                      className="w-full"
                      placeholder={t("fields.returnDate.placeholder")}
                      suffixIcon={<DatePickerIcon />}
                      disabled={readonly}
                      inputReadOnly={readonly}
                      defaultPickerValue={date ? dayjs(date) : undefined}
                      disabledDate={(current) =>
                        current &&
                        (current < dayjs().startOf("day") ||
                          isBeforeDepartureDay(current))
                      }
                      onChange={clearReturnTimeIfBeforeDeparture}
                    />
                  </Form.Item>
                </div>
              </Col>

              <Col xs={24} md={12} lg={6}>
                <div className="inputS1">
                  <Form.Item
                    label={t("fields.returnTime.label")}
                    name="returnTime">
                    <TimePicker
                      className="w-full"
                      placeholder={t("fields.returnTime.placeholder")}
                      format={PRIVATE_TIME_FORMAT}
                      minuteStep={5}
                      showNow={false}
                      needConfirm={false}
                      disabled={readonly}
                      inputReadOnly={readonly}
                      disabledTime={disabledReturnTime}
                    />
                  </Form.Item>
                </div>
              </Col>
            </>
          )}
        </Row>

        <div className="flex flex-col md:flex-row sm:items-center justify-between mt-4 gap-4">
          <Form.Item name="tripType" initialValue="one" className="!mb-0">
            <Radio.Group
              className="airplane-radio-group !flex flex-col items-start gap-2 sm:flex-row"
              disabled={readonly}
              onChange={(e) => {
                if (e.target.value !== "round_trip") {
                  form.setFieldsValue({ returnDate: null, returnTime: null });
                }
              }}
            >
              <Radio value="one">{t("tripTypes.one")}</Radio>
              <Radio value="round_trip">{t("tripTypes.round")}</Radio>
            </Radio.Group>
          </Form.Item>

          {!readonly && (
            <Button
              type="primary"
              htmlType="submit"
              disabled={!isFormValid}
              className="flex items-center gap-2 px-8 min-h-[46px] min-w-[180px] rounded-xl"
            >
              <FaSearch />
              {t("actions.search")}
            </Button>
          )}
        </div>
      </Form>
    </APIProvider>
  );
};
