"use client";

import { useTranslations } from "next-intl";
import { ProfileLayout } from "@/components/user/profile/ProfileLayout";
import { MyTripsTabs } from "@/components/user/my-trips/MyTripsTabs";
import { useLocalizedLink } from "@/hooks/useLocalizedLink";

const MyTripsPage = () => {
  const getLink = useLocalizedLink();
  const t = useTranslations("profile.myTrips");

  return (
    <ProfileLayout
      title={t("title")}
      currentPage={t("title")}
      currentLink={getLink("/user/my-trips")}
    >
      <MyTripsTabs />
    </ProfileLayout>
  );
};

export default MyTripsPage;
