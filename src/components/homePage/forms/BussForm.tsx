"use client";
import { Button, Col, DatePicker, Form, Radio, Row, Select } from "antd";
import { FaSearch } from "react-icons/fa";
import { DatePickerIcon } from "@/components/tools/icons/DatePickerIcon";
import { MdOutlineLocationOn } from "react-icons/md";
import { useTranslations } from "next-intl";
import useGetBusLocations from "@/app/[locale]/_hooks/useGetBusLocations";
import { useRouter } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/appStore";
import { setBusCities } from "@/store/slices/bus/busSlice";
import dayjs from "dayjs";
import { useEffect } from "react";

export const BussForm = ({ readonly = false }: { readonly?: boolean }) => {
  const [form] = Form.useForm();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const searchParams = useSearchParams();
  const tripType = Form.useWatch("tripType", form);
  const departure = Form.useWatch("departure", form);
  const arrival = Form.useWatch("arrival", form);
  const departureDate = Form.useWatch("departureDate", form);
  const returnDate = Form.useWatch("returnDate", form);

  const t = useTranslations("homePage.busForm");

  const { data: locations, isLoading: locationsLoading } = useGetBusLocations();

  const locationOptions = (locations ?? []).map((loc) => ({
    value: loc.id,
    label: loc.name_en,
    name_ar: loc.name_ar,
  }));

  useEffect(() => {
    if (!locations?.length) return;
    const cityFrom = searchParams.get("city_from");
    const cityTo = searchParams.get("city_to");
    const date = searchParams.get("date");
    const tripType = searchParams.get("trip_type");
    const returnDate = searchParams.get("return_date");
    if (!cityFrom && !cityTo) return;
    form.setFieldsValue({
      ...(cityFrom ? { departure: Number(cityFrom) } : {}),
      ...(cityTo ? { arrival: Number(cityTo) } : {}),
      ...(date ? { departureDate: dayjs(date) } : {}),
      ...(tripType ? { tripType } : {}),
      ...(returnDate ? { returnDate: dayjs(returnDate) } : {}),
    });
  }, [locations]);

  const renderLocationOption = (option: {
    data: { label: string; name_ar: string };
  }) => (
    <div className="py-1">
      <p className="text-base leading-tight">{option.data.label}</p>
      <p className="text-xs text-gray-400 leading-tight">
        {option.data.name_ar}
      </p>
    </div>
  );

  const isRoundTrip = tripType === "round-trip";
  const isFormValid =
    !!departure &&
    !!arrival &&
    !!departureDate &&
    (!isRoundTrip || !!returnDate);

  const focusField = (name: string) => {
    const instance = form.getFieldInstance(name);
    if (instance?.nativeElement) {
      setTimeout(() => instance.nativeElement.click());
    } else if (instance?.input) {
      setTimeout(() => instance.input.click());
    }
  };

  const handleSearch = () => {
    const values = form.getFieldsValue();

    // Save city names for display on the discover page
    const fromOption = locationOptions.find(
      (o) => o.value === values.departure,
    );
    const toOption = locationOptions.find((o) => o.value === values.arrival);
    if (fromOption && toOption) {
      dispatch(
        setBusCities({
          fromCity: {
            id: values.departure,
            name: fromOption.label,
            name_ar: fromOption.name_ar,
            name_en: fromOption.label,
          },
          toCity: {
            id: values.arrival,
            name: toOption.label,
            name_ar: toOption.name_ar,
            name_en: toOption.label,
          },
        }),
      );
    }

    const query = new URLSearchParams();
    query.set("city_from", String(values.departure));
    query.set("city_to", String(values.arrival));
    query.set("date", dayjs(values.departureDate).format("YYYY-MM-DD"));
    // WARNING: Round-trip is unsupported by the bus API — trip_type is forced to
    // "one" and the return_date is never sent. Restore the block below once the
    // backend supports round trips (see the disabled round-trip radio).
    query.set("trip_type", "one");
    // if (isRoundTrip && values.returnDate) {
    //   query.set("return_date", dayjs(values.returnDate).format("YYYY-MM-DD"));
    // }
    router.push(`/discover-bus?${query.toString()}`);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSearch}
      autoComplete="off"
      name="addEditCategoryForm">
      <Row
        gutter={[16, 16]}
        align="stretch">
        {/* محطة التحرك */}
        <Col
          xs={24}
          lg={6}>
          <div className="inputS1">
            <Form.Item
              label={t("fields.from.label")}
              name="departure"
              rules={[{ required: true, message: "" }]}>
              <Select
                showSearch
                disabled={readonly}
                open={readonly ? false : undefined}
                loading={locationsLoading}
                options={locationOptions}
                notFoundContent={
                  locationsLoading ? t("fields.loading") : t("fields.noOptions")
                }
                placeholder={t("fields.departure.placeholder")}
                filterOption={(input, option) =>
                  String(option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                optionRender={renderLocationOption}
                dropdownAlign={{ points: ["tc", "bc"], offset: [0, 4] }}
                listHeight={128}
                suffixIcon={
                  <MdOutlineLocationOn className="text-2xl text-[#819DAF]" />
                }
                onSelect={() =>
                  setTimeout(() => form.getFieldInstance("arrival")?.focus())
                }
              />
            </Form.Item>
          </div>
        </Col>

        {/* محطة الوصول */}
        <Col
          xs={24}
          lg={6}>
          <div className="inputS1">
            <Form.Item
              label={t("fields.to.label")}
              name="arrival"
              rules={[{ required: true, message: "" }]}>
              <Select
                showSearch
                showAction={["focus"]}
                disabled={readonly}
                open={readonly ? false : undefined}
                loading={locationsLoading}
                options={locationOptions}
                notFoundContent={
                  locationsLoading ? t("fields.loading") : t("fields.noOptions")
                }
                placeholder={t("fields.arrival.placeholder")}
                filterOption={(input, option) =>
                  String(option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                optionRender={renderLocationOption}
                placement="bottomLeft"
                listHeight={128}
                suffixIcon={
                  <MdOutlineLocationOn className="text-2xl text-[#819DAF]" />
                }
                onSelect={() => focusField("departureDate")}
              />
            </Form.Item>
          </div>
        </Col>

        {/* تاريخ التحرك */}
        <Col
          xs={24}
          lg={4}>
          <div className="inputS1">
            <Form.Item
              label={t("fields.departureDate.label")}
              name="departureDate"
              rules={[{ required: true, message: "" }]}>
              <DatePicker
                placeholder={t("fields.departureDate.placeholder")}
                suffixIcon={<DatePickerIcon />}
                disabled={readonly}
                inputReadOnly={readonly}
                disabledDate={(current) =>
                  current && current < dayjs().startOf("day")
                }
                onChange={(val) => {
                  if (val) {
                    // Clear return date if it's now earlier than departure
                    const ret = form.getFieldValue("returnDate");
                    if (ret && dayjs(ret).isBefore(dayjs(val), "day")) {
                      form.setFieldValue("returnDate", undefined);
                    }
                    // Move focus to return date if round trip, otherwise skip
                    if (isRoundTrip) {
                      focusField("returnDate");
                    }
                  }
                }}
              />
            </Form.Item>
          </div>
        </Col>

        {/* تاريخ العودة */}
        <Col
          xs={24}
          lg={4}>
          <div
            className={`inputS1 ${tripType === "one" ? "disabled" : ""}`}
            onClick={() => {
              // WARNING: Round-trip disabled (no bus-API support). Clicking the
              // return-date box no longer switches the form to a round trip.
              // if (!readonly && tripType === "one") form.setFieldValue("tripType", "round-trip");
            }}>
            <Form.Item
              label={t("fields.returnDate.label")}
              name="returnDate"
              rules={[{ required: isRoundTrip, message: "" }]}>
              <DatePicker
                placeholder={t("fields.returnDate.placeholder")}
                suffixIcon={<DatePickerIcon />}
                inputReadOnly={readonly}
                disabled={readonly || tripType === "one"}
                disabledDate={(current) => {
                  const dep = form.getFieldValue("departureDate");
                  const min = dep
                    ? dayjs(dep).startOf("day")
                    : dayjs().startOf("day");
                  return current && current < min;
                }}
              />
            </Form.Item>
          </div>
        </Col>
      </Row>
      <div className="flex flex-col md:flex-row sm:items-center justify-between mt-4 gap-4">
        {/* Right: Trip type radios */}
        <div className="flex flex-wrap items-center gap-6">
          <Form.Item
            name="tripType"
            initialValue="one"
            className="!mb-0">
            <Radio.Group
              disabled={readonly}
              className="airplane-radio-group !flex flex-col items-start gap-2 sm:flex-row">
              <Radio value="one">{t("tripTypes.one")}</Radio>
              {/* WARNING: Round-trip is disabled for buses. The Wdeny bus API has no
                round-trip / return-ticket support (no `round` flag, no return_date,
                no linked-order / combined-payment endpoint), so only one-way trips
                are bookable. Re-enable once the backend exposes a round-trip flow. */}
              <Radio
                value="round-trip"
                disabled>
                {t("tripTypes.round")}
              </Radio>
            </Radio.Group>
          </Form.Item>
        </div>
        {/* زر البحث */}
        {!readonly && (
            <Button
              htmlType="submit"
              type="primary"
              disabled={!isFormValid}
              className="flex items-center gap-2 px-8 min-h-[46px] min-w-[180px] rounded-xl">
              <FaSearch />
              {t("actions.search")}
            </Button>
        )}
      </div>
    </Form>
  );
};
