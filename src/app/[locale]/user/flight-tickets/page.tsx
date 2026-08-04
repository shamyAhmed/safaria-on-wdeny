"use client";

import { useTranslations } from "next-intl";
import { ProfileLayout } from "@/components/user/profile/ProfileLayout";
import { FlightTicketsContent } from "@/components/user/flight-tickets/FlightTicketsContent";
import { useLocalizedLink } from "@/hooks/useLocalizedLink";

const FlightTicketsPage = () => {
  const getLink = useLocalizedLink();
  const t = useTranslations("profile.myTrips");

  return (
    <ProfileLayout
      title={t("title")}
      currentPage={t("title")}
      currentLink={getLink("/user/flight-tickets")}
    >
      <FlightTicketsContent />
    </ProfileLayout>
  );
};

export default FlightTicketsPage;
