"use client";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Popover,
  Radio,
  Row,
  Select,
} from "antd";
import { AirportSelectInput } from "./AirportSelectInput";
import { TripType } from "@/app/[locale]/_types/SearchFlight";
import { useEffect, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { DatePickerIcon } from "@/components/tools/icons/DatePickerIcon";
import { IoPersonOutline, IoCloseCircleOutline } from "react-icons/io5";
import { PassengersPopoverContent } from "./PassengersPopoverContent";
import { useSearchParams } from "next/navigation";
import { useRouter, usePathname } from "@/i18n/navigation";
import dayjs from "dayjs";
import { useTranslations } from "next-intl";

const { Option } = Select;

type Segment = { id: number };

const MAX_PASSENGERS = 9;

export const AirplaneForm = ({ readonly = false }: { readonly?: boolean }) => {
  const [form] = Form.useForm();
  const router = useRouter();
  const classRef = useRef(null);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [passengers, setPassengers] = useState({
    adt: 1,
    chd: 0,
    inf: 0,
  });
  const t = useTranslations("homePage.airplaneForm");
  const [tripType, setTripType] = useState<TripType>("round_trip");
  const [segments, setSegments] = useState<Segment[]>([{ id: 1 }, { id: 2 }]);
  const [isFormValid, setIsFormValid] = useState(false);
  const [passengersOpen, setPassengersOpen] = useState(false);
  const [depDates, setDepDates] = useState<Record<number, dayjs.Dayjs | null>>({});

  const checkValidity = (
    currentTripType: TripType = tripType,
    currentSegments: Segment[] = segments,
  ) => {
    const values = form.getFieldsValue();
    const hasClass = !!values["class"];
    if (currentTripType === "multi_city") {
      const valid =
        hasClass &&
        currentSegments.every(
          (_, idx) =>
            values[`from_${idx}`] &&
            values[`to_${idx}`] &&
            values[`date_${idx}`],
        );
      setIsFormValid(valid);
    } else {
      const base = !!(
        hasClass &&
        values["from_0"] &&
        values["to_0"] &&
        values["date_0"]
      );
      const valid =
        currentTripType === "round_trip"
          ? base && !!values["returnDate_0"]
          : base;
      setIsFormValid(valid);
    }
  };


  const totalPassengers = Object.values(passengers).reduce(
    (sum, n) => sum + n,
    0,
  );

  const handlePassengersChange = (
    key: keyof typeof passengers,
    value: (typeof passengers)[typeof key],
  ) => {
    const newPassengers = {
      ...passengers,
      inf: key === "adt" && value < passengers.inf ? value : passengers.inf,
      [key]: value,
    };

    form.setFieldValue(
      "passengers",
      Object.values(newPassengers).reduce((curr, next) => curr + next, 0),
    );
    setPassengers(newPassengers);
  };

  useEffect(() => {
    if (pathname.includes("/discover-airplan")) {
      const type = searchParams.get("tripType") as TripType;
      if (type) {
        setTripType(type);
        const newSegments: Segment[] = [];
        const initialValues: any = { tripType: type };

        if (type === "multi_city") {
          let i = 0;
          while (searchParams.get(`from_${i}`)) {
            newSegments.push({ id: i + 1 });
            initialValues[`from_${i}`] = searchParams.get(`from_${i}`);
            initialValues[`to_${i}`] = searchParams.get(`to_${i}`);
            const dateStr = searchParams.get(`date_${i}`);
            if (dateStr) initialValues[`date_${i}`] = dayjs(dateStr);
            i++;
          }
          setSegments(
            newSegments.length > 0 ? newSegments : [{ id: 1 }, { id: 2 }],
          );
        } else {
          initialValues["from_0"] = searchParams.get("from_0");
          initialValues["to_0"] = searchParams.get("to_0");
          const date0 = searchParams.get("date_0");
          if (date0) initialValues["date_0"] = dayjs(date0);

          if (type === "round_trip") {
            const returnDate = searchParams.get("returnDate_0");
            if (returnDate) initialValues["returnDate_0"] = dayjs(returnDate);
          }
        }

        const restoredAdt = Number(searchParams.get("adt") ?? 1);
        const restoredChd = Number(searchParams.get("chd") ?? 0);
        const restoredInf = Number(searchParams.get("inf") ?? 0);
        setPassengers({ adt: restoredAdt, chd: restoredChd, inf: restoredInf });
        initialValues["passengers"] = restoredAdt + restoredChd + restoredInf;
        initialValues["class"] =
          searchParams.get("class") ?? "CABIN_CLASS_ECONOMY";

        form.setFieldsValue(initialValues);
        checkValidity(type, type === "multi_city" ? newSegments : segments);
      }
    }
  }, [searchParams, pathname, form]);

  //! I don't know what is the point of this, it might be removed.
  useEffect(() => {
    checkValidity(tripType, segments);
  }, [tripType, segments]);

  const addSegment = () => {
    const next = [...segments, { id: Date.now() }];
    setSegments(next);
    checkValidity(tripType, next);
  };

  const removeSegment = (id: number) => {
    const next = segments.filter((s) => s.id !== id);
    setSegments(next);
    checkValidity(tripType, next);
  };

  const handleSearch = () => {
    form.validateFields().then((values) => {
      const query = new URLSearchParams();
      query.set("tripType", tripType);

      if (tripType === "multi_city") {
        segments.forEach((_, idx) => {
          if (values[`from_${idx}`])
            query.set(`from_${idx}`, values[`from_${idx}`]);
          if (values[`to_${idx}`]) query.set(`to_${idx}`, values[`to_${idx}`]);
          if (values[`date_${idx}`])
            query.set(
              `date_${idx}`,
              dayjs(values[`date_${idx}`]).format("YYYY-MM-DD"),
            );
        });
      } else {
        if (values["from_0"]) query.set("from_0", values["from_0"]);
        if (values["to_0"]) query.set("to_0", values["to_0"]);
        if (values["date_0"])
          query.set("date_0", dayjs(values["date_0"]).format("YYYY-MM-DD"));
        if (tripType === "round_trip" && values["returnDate_0"])
          query.set(
            "returnDate_0",
            dayjs(values["returnDate_0"]).format("YYYY-MM-DD"),
          );
      }

      query.set("adt", String(passengers.adt));
      query.set("chd", String(passengers.chd));
      query.set("inf", String(passengers.inf));
      if (values["class"]) query.set("class", values["class"]);
      query.set("sort", "CheapestFirst");

      router.push(`/discover-airplan?${query.toString()}`);
    });
  };

  // Rows to show: one / round = 1 row, multi = all segments
  const visibleSegments = tripType === "multi_city" ? segments : [segments[0]];
  const isLastSegment = (idx: number) => idx === visibleSegments.length - 1;

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSearch}
      onValuesChange={() => checkValidity()}
      autoComplete="off"
      initialValues={{
        tripType: "round_trip",
        passengers: 1,
        class: "CABIN_CLASS_ECONOMY",
      }}
      className="airplane-form">
      <div>
        {/* Segment Rows */}
        {visibleSegments.map((seg, idx) => {
          const isSingleTrip = tripType === "one_way";
          return (
            <Row
              key={seg.id}
              gutter={[12, 12]}
              className="mb-2">
              <Col
                xs={24}
                md={12}
                lg={4}>
                <AirportSelectInput
                  name={`from_${idx}`}
                  label={t("fields.from.label")}
                  placeholder={t("fields.from.placeholder")}
                  index={idx}
                  type="origin"
                  form={form}
                  onAirportSelect={(val) => {
                    if (!val) {
                      // schedule a focus (scheduling to the UI update in the component after changing the value)
                      setTimeout(() => {
                        form.scrollToField(`from_${idx}`, { focus: true });
                      });
                    } else form.scrollToField(`to_${idx}`, { focus: true });
                  }}
                  readonly={readonly}
                />
              </Col>

              <Col
                xs={24}
                md={12}
                lg={4}>
                <AirportSelectInput
                  name={`to_${idx}`}
                  label={t("fields.to.label")}
                  placeholder={t("fields.to.placeholder")}
                  iconRotation="rotate(-135deg)"
                  index={idx}
                  type="destination"
                  form={form}
                  readonly={readonly}
                  onAirportSelect={(val) => {
                    const field = form.getFieldInstance(`date_${idx}`);
                    if (!val) {
                      // schedule a focus (scheduling to the UI update in the component after changing the value)
                      setTimeout(() => {
                        form.scrollToField(`to_${idx}`, { focus: true });
                      });
                    } else if (field) {
                      field.nativeElement.click();
                    }
                  }}
                />
              </Col>

              {/* تاريخ السفر */}
              <Col
                xs={24}
                md={12}
                lg={4}>
                <div className="inputS1">
                  <Form.Item
                    label={t("fields.departureDate.label")}
                    name={`date_${idx}`}>
                    <DatePicker
                      className="w-full"
                      placeholder={t("fields.departureDate.placeholder")}
                      suffixIcon={<DatePickerIcon />}
                      disabled={readonly}
                      inputReadOnly={readonly}
                      disabledDate={(current) =>
                        current && current < dayjs().add(1, "day").startOf("day")
                      }
                      onChange={(val) => {
                        if (!val) {
                          const currentInstance = form.getFieldInstance(
                            `date_${idx}`,
                          );
                          if (currentInstance)
                            setTimeout(() =>
                              currentInstance.nativeElement.click(),
                            );
                        } else {
                          setDepDates((prev) => ({ ...prev, [idx]: val }));
                          if (tripType === "round_trip") {
                            const minReturn = dayjs(val).add(1, "day").startOf("day");
                            const currentReturn = form.getFieldValue(`returnDate_${idx}`);
                            if (currentReturn && dayjs(currentReturn).isBefore(minReturn, "day")) {
                              form.setFieldValue(`returnDate_${idx}`, null);
                            }
                          }
                          if (tripType === "multi_city" && idx > 0 && idx + 1 < segments.length) {
                            setTimeout(() =>
                              form.scrollToField(`from_${idx + 1}`, { focus: true }),
                            );
                          } else if (tripType === "round_trip") {
                            const returnElement = form.getFieldInstance(
                              `returnDate_${idx}`,
                            );
                            if (returnElement)
                              returnElement.nativeElement.click();
                          } else {
                            const passengersField =
                              form.getFieldInstance("passengers");
                            if (passengersField?.input) {
                              passengersField.input.click();
                            }
                          }
                        }
                      }}
                    />
                  </Form.Item>
                </div>
              </Col>

              {/* تاريخ العودة - only for Round Trip */}
              {tripType !== "multi_city" && (
                <Col
                  xs={24}
                  md={12}
                  lg={4}>
                  <div
                    className={`inputS1 ${isSingleTrip ? "disabled" : ""}`}
                    onClick={() => {
                      if (!readonly && tripType === "one_way") {
                        form.setFieldValue("tripType", "round_trip");
                        setTripType("round_trip");
                      }
                    }}>
                    <Form.Item
                      label={t("fields.returnDate.label")}
                      name={`returnDate_${idx}`}>
                      <DatePicker
                        className="w-full"
                        placeholder={t("fields.returnDate.placeholder")}
                        suffixIcon={<DatePickerIcon />}
                        disabled={readonly}
                        inputReadOnly={readonly}
                        defaultPickerValue={depDates[idx] ?? undefined}
                        disabledDate={(current) => {
                          const dep = form.getFieldValue(`date_${idx}`);
                          const min = dep
                            ? dayjs(dep).add(1, "day").startOf("day")
                            : dayjs().add(2, "day").startOf("day");
                          return current && current < min;
                        }}
                        onChange={(val) => {
                          if (!val) {
                            const currentInstance = form.getFieldInstance(
                              `returnDate_${idx}`,
                            );
                            if (currentInstance)
                              setTimeout(() =>
                                currentInstance.nativeElement.click(),
                              );
                          } else {
                            const field = form.getFieldInstance("passengers");
                            field.input.click();
                          }
                        }}
                      />
                    </Form.Item>
                  </div>
                </Col>
              )}

              {/* عدد المسافرين - only on first row */}
              {idx === 0 && (
                <Col
                  xs={24}
                  md={12}
                  lg={4}>
                  <Popover
                    trigger={readonly ? [] : "click"}
                    placement="bottom"
                    open={passengersOpen}
                    onOpenChange={setPassengersOpen}
                    content={
                      <PassengersPopoverContent
                        passengers={passengers}
                        totalPassengers={totalPassengers}
                        maxPassengers={MAX_PASSENGERS}
                        onPassengersChange={handlePassengersChange}
                        onApply={() => {
                          setPassengersOpen(false);
                          form.scrollToField("class", {focus: true})
                        }}
                      />
                    }>
                    <div className="inputS1">
                      <Form.Item
                        label={t("fields.passengers.label")}
                        name="passengers">
                        <Input
                          placeholder={t("fields.passengers.placeholder")}
                          prefix={
                            <IoPersonOutline className="text-xl text-[#819DAF]" />
                          }
                          readOnly
                        />
                      </Form.Item>
                    </div>
                  </Popover>
                </Col>
              )}

              {/* الدرجة - only on first row */}
              {idx === 0 && (
                <Col
                  xs={24}
                  md={12}
                  lg={4}>
                  <div className="selectS1">
                    <Form.Item
                      label={t("fields.class.label")}
                      name="class">
                      <Select
                        placeholder={t("fields.class.placeholder")}
                        allowClear
                        showAction={["focus"]}
                        ref={classRef}
                        onSelect={() => {
                          if (tripType === "multi_city") {
                            setTimeout(() => {
                              form.scrollToField("from_1", { focus: true });
                            });
                          } else {
                            document.querySelector("form")?.focus();
                          }
                        }}
                        disabled={readonly}>
                        <Option value="CABIN_CLASS_ECONOMY">
                          {t("classOptions.economy")}
                        </Option>
                        <Option value="CABIN_CLASS_PREMIUM_ECONOMY">
                          {t("classOptions.premiumEconomy")}
                        </Option>
                        <Option value="CABIN_CLASS_BUSINESS">
                          {t("classOptions.business")}
                        </Option>
                        <Option value="CABIN_CLASS_FIRST">
                          {t("classOptions.first")}
                        </Option>
                      </Select>
                    </Form.Item>
                  </div>
                </Col>
              )}

              {/* Remove + Add City — shown on non-first rows in multi mode */}
              {!readonly && tripType === "multi_city" && idx > 0 && (
                <Col
                  xs={24}
                  lg={5}>
                  <div className="flex items-center gap-3 mb-[24px]">
                    {/* Remove row button — only if more than 2 segments */}
                    {segments.length > 2 && (
                      <button
                        type="button"
                        onClick={() => removeSegment(seg.id)}
                        className="flex items-center gap-1 text-red-400 hover:text-primary transition-colors text-sm font-medium  mt-[55px]">
                        <IoCloseCircleOutline size={20} />
                        {t("actions.remove")}
                      </button>
                    )}

                    {/* Add city — only on the last row */}
                    {isLastSegment(idx) && (
                      <button
                        type="button"
                        onClick={addSegment}
                        className="text-primary font-bold text-sm underline underline-offset-2 hover:opacity-75 transition-opacity mt-[55px]">
                        {t("actions.addCity")}
                      </button>
                    )}
                  </div>
                </Col>
              )}
            </Row>
          );
        })}

        {/* Bottom Row: Search button + Trip Type radios */}
        <div className="flex flex-col md:flex-row sm:items-center justify-between mt-4 gap-4">
          {/* Right: Trip type radios */}
          <div className="flex flex-wrap items-center gap-6">
            <Form.Item
              name="tripType"
              className="!mb-0">
              <Radio.Group
                onChange={(e) => {
                  setTripType(e.target.value);
                  if (e.target.value !== "round_trip") {
                    form.setFieldValue("returnDate_0", undefined);
                  }
                }}
                value={tripType}
                disabled={readonly}
                className="airplane-radio-group !flex flex-col items-start gap-2 sm:flex-row">
                <Radio value="one_way">{t("tripTypes.one")}</Radio>
                <Radio value="round_trip">{t("tripTypes.round")}</Radio>
                <Radio value="multi_city">{t("tripTypes.multi")}</Radio>
              </Radio.Group>
            </Form.Item>
          </div>

          {/* Left: Search button */}
          {!readonly && (
            <Button
              type="primary"
              htmlType="submit"
              disabled={!isFormValid}
              className="flex items-center gap-2 px-8 min-h-[46px] min-w-[180px] rounded-xl">
              <FaSearch />
              {t("actions.search")}
            </Button>
          )}
        </div>
      </div>
    </Form>
  );
};
