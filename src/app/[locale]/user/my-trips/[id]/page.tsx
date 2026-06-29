"use client";

import { useParams } from "next/navigation";
import { ProfileLayout } from "@/components/user/profile/ProfileLayout";
import { FlightTicketDetail } from "@/components/user/flight-tickets/FlightTicketDetail";
import { useLocalizedLink } from "@/hooks/useLocalizedLink";

const FlightTicketDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const getLink = useLocalizedLink();

  return (
    <ProfileLayout
      title="تفاصيل الرحلة"
      currentPage="تفاصيل الرحلة"
      currentLink={getLink(`/user/my-trips/${id}`)}
    >
      <div className="formS1 !border-none">
        <FlightTicketDetail orderId={id} />
      </div>
    </ProfileLayout>
  );
};

export default FlightTicketDetailPage;
