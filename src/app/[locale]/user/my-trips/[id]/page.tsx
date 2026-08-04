"use client";

import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { ProfileLayout } from "@/components/user/profile/ProfileLayout";
import { FlightTicketDetail } from "@/components/user/flight-tickets/FlightTicketDetail";
import { useLocalizedLink } from "@/hooks/useLocalizedLink";

const FlightTicketDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const getLink = useLocalizedLink();
  const t = useTranslations("profile.myTrips.detail");

  return (
    <ProfileLayout
      title={t("pageTitle")}
      currentPage={t("pageTitle")}
      currentLink={getLink(`/user/my-trips/${id}`)}
    >
      <div className="formS1 !border-none">
        <FlightTicketDetail orderId={id} />
      </div>
    </ProfileLayout>
  );
};

export default FlightTicketDetailPage;
