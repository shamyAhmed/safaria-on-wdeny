"use client";
import { Button, Col, Form, Radio, Row } from "antd";
import { FaSearch } from "react-icons/fa";
import { useTranslations } from "next-intl";
import { useWatch } from "antd/es/form/Form";
import { useRouter } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/appStore";
import { APIProvider } from "@vis.gl/react-google-maps";
import { PrivatePlacesInput } from "./PrivatePlacesInput";
import {
  setPickupLocation,
  setDestinationLocation,
} from "@/store/slices/private/privateTripSlice";
import { useEffect } from "react";

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!;

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

  // On the readonly listing page, initialise the trip-type toggle from the URL.
  useEffect(() => {
    const raw = searchParams.get("rounded");
    if (raw == null) return;
    form.setFieldValue("tripType", raw === "true" ? "round_trip" : "one");
  }, []);

  const tripType = useWatch("tripType", form);
  const isRound = tripType === "round_trip";

  const isFormValid = !!pickupLocation && !!destinationLocation;

  const handleSearch = () => {
    if (!pickupLocation || !destinationLocation) return;

    const query = new URLSearchParams();
    query.set("from_lat", String(pickupLocation.lat));
    query.set("from_lng", String(pickupLocation.lng));
    query.set("to_lat", String(destinationLocation.lat));
    query.set("to_lng", String(destinationLocation.lng));
    query.set("rounded", isRound ? "true" : "false");

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

        <div className="flex flex-col md:flex-row sm:items-center justify-between mt-4 gap-4">
          <Form.Item name="tripType" initialValue="one" className="!mb-0">
            <Radio.Group
              className="airplane-radio-group !flex flex-col items-start gap-2 sm:flex-row"
              disabled={readonly}
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
