"use client";

import OfferCard from "@/components/tools/cards/OfferCard";
import { OfferCardProps } from "@/types/types";
import { Row, Col } from "antd";

// Calculate end dates for countdown timers
const getEndDate = (daysFromNow: number) => {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  date.setHours(date.getHours() + 2);
  date.setMinutes(date.getMinutes() + 18);
  date.setSeconds(date.getSeconds() + 46);
  return date;
};

const offers: OfferCardProps[] = [
  {
    id: "1",
    title: "تخفيضات الشهر",
    subtitle: "افضل العروض",
    endDate: getEndDate(0),
    image: "/products/offer1.webp",
    bgColor: "blue",
    buttonVariant: "white",
  },
  {
    id: "2",
    title: "تخفيضات الشهر",
    subtitle: "افضل العروض",
    endDate: getEndDate(3),
    image: "/products/offer3.png",
    bgColor: "gray",
    buttonVariant: "dark",
  },
  {
    id: "3",
    title: "تخفيضات الشهر",
    subtitle: "افضل العروض",
    endDate: getEndDate(0),
    image: "/products/offer3.png",
    bgColor: "teal",
    buttonVariant: "outline-white",
  },
];

export default function MonthlyOffersSection() {
  const handleShopNow = (id: string) => {
    console.log("Shop now clicked for offer:", id);
  };

  return (
    <section className="py-16 px-4 md:px-8 lg:px-16 bg-background">
      <div className="max-w-7xl mx-auto">
        <Row gutter={[24, 24]}>
          {offers.map((offer, index) => (
            <Col key={offer.id} xs={24} md={8}>
              <OfferCard {...offer} index={index} onShopNow={handleShopNow} />
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
}
