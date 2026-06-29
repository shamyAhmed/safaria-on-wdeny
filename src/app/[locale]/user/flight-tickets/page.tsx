"use client";

import { ProfileLayout } from "@/components/user/profile/ProfileLayout";
import { FlightTicketsContent } from "@/components/user/flight-tickets/FlightTicketsContent";
import { useLocalizedLink } from "@/hooks/useLocalizedLink";

const FlightTicketsPage = () => {
  const getLink = useLocalizedLink();

  return (
    <ProfileLayout
      title="تذاكر الطيران"
      currentPage="تذاكر الطيران"
      currentLink={getLink("/user/flight-tickets")}
    >
      <FlightTicketsContent />
    </ProfileLayout>
  );
};

export default FlightTicketsPage;
