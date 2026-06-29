"use client";

import { ProfileLayout } from "@/components/user/profile/ProfileLayout";
import { MyTripsTabs } from "@/components/user/my-trips/MyTripsTabs";
import { useLocalizedLink } from "@/hooks/useLocalizedLink";

const MyTripsPage = () => {
  const getLink = useLocalizedLink();

  return (
    <ProfileLayout
      title="رحلاتي"
      currentPage="رحلاتي"
      currentLink={getLink("/user/my-trips")}
    >
      <MyTripsTabs />
    </ProfileLayout>
  );
};

export default MyTripsPage;
