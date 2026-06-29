import style from "./styles/discover.module.scss";
import { PageBannerSection } from "../tools/sections/PageBannerSection";
import { BussForm } from "../homePage/forms/BussForm";
import { Col, Row } from "antd";
import { FaFilter } from "react-icons/fa6";
import { DiscoverFiltersSection } from "./sections/DiscoverFiltersSection";
import { BusTripCard } from "./cards/BustripCard";
import { PrivateCarCard } from "./cards/PrivateCarCard";

export const DiscoverComponent = () => {
  // Array of multiple trips for testing
  const exampleTrips = [
    {
      id: "trip_001",
      company: "نورس باص",
      companyLogo: "/photos/nowrasbus-logo.png",
      rating: 4.5,
      reviewCount: 150,
      departureTime: "03:50 مساءً",
      arrivalTime: "05:00 صباحاً",
      duration: "5 سا و 15 د",
      date: "24 أكتوبر",
      busImages: [
        "/photos/blue-bus.png",
        "/photos/blue-bus.png",
        "/photos/blue-bus.png",
      ],
      departureCity: "القاهرة",
      arrivalCity: "الإسكندرية",
      departureStation: "محطة القاهرة الرئيسية",
      arrivalStation: "محطة الإسكندرية الرئيسية",
      amenities: {
        wifi: true,
        tv: true,
        music: true,
        coffee: true,
        charging: true,
      },
      classOptions: [
        {
          id: "class_1",
          name: "حر خفيفة",
          price: 150,
          available: true,
        },
        {
          id: "class_2",
          name: "الروضة",
          price: 180,
          available: true,
        },
        {
          id: "class_3",
          name: "الفاخرة",
          price: 220,
          available: true,
        },
        {
          id: "class_4",
          name: "النزهة",
          price: 200,
          available: true,
        },
        {
          id: "class_5",
          name: "الحريرية",
          price: 250,
          available: false,
        },
      ],
      seatsLeft: 6,
    },
    {
      id: "trip_002",
      company: "سابتكو",
      companyLogo: "/photos/nowrasbus-logo.png",
      rating: 4.3,
      reviewCount: 200,
      departureTime: "06:00 صباحاً",
      arrivalTime: "11:30 صباحاً",
      duration: "5 سا و 30 د",
      date: "24 أكتوبر",
      busImages: [
        "/photos/buses/saptco-bus.png",
        "/photos/buses/saptco-bus.png",
      ],
      departureCity: "الجيزة",
      arrivalCity: "الأقصر",
      departureStation: "محطة الجيزة المركزية",
      arrivalStation: "محطة الأقصر الجديدة",
      amenities: {
        wifi: true,
        tv: true,
        music: false,
        coffee: true,
        charging: true,
      },
      classOptions: [
        {
          id: "class_1",
          name: "حر خفيفة",
          price: 120,
          available: true,
        },
        {
          id: "class_2",
          name: "الروضة",
          price: 160,
          available: true,
        },
        {
          id: "class_3",
          name: "الفاخرة",
          price: 200,
          available: false,
        },
        {
          id: "class_4",
          name: "النزهة",
          price: 180,
          available: true,
        },
        {
          id: "class_5",
          name: "الحريرية",
          price: 230,
          available: true,
        },
      ],
      seatsLeft: 12,
    },
  ];

  const exampleCars = [
    {
      id: "car_001",
      company: "askr",
      companyLogo: "/photos/nowrasbus-logo.png",
      carModel: "Mercedes C-Class",
      rating: 4.5,
      reviewCount: 120,
      pricePerDay: 240,
      currency: "ريال سعودي",
      carImages: ["/photos/car.png", "/photos/car.png", "/photos/car.png"],

      features: [
        "نظام تطبيق مريح",
        "مقاعد قابلة للطواء",
        "أوتوماتيك",
        "122 حصان",
        "محرك 1800 سي سي",
        "مريحة للرحلات الطويلة",
      ],
      pickupDate: "السبت 24 أكتوبر",
      pickupTime: "10:00 صباحا",
      availableNow: true,
    },
    {
      id: "car_002",
      company: "Budget",
      companyLogo: "/images/companies/budget-logo.png",
      carModel: "Toyota Camry",
      rating: 4.3,
      reviewCount: 89,
      pricePerDay: 180,
      currency: "ريال سعودي",
      carImages: ["/photos/car.png", "/photos/car.png", "/photos/car.png"],
      features: [
        "نظام ملاحة GPS",
        "مقاعد جلد",
        "أوتوماتيك",
        "184 حصان",
        "محرك 2500 سي سي",
        "استهلاك وقود اقتصادي",
      ],
      pickupDate: "الأحد 25 أكتوبر",
      pickupTime: "09:00 صباحا",
      availableNow: true,
    },
    {
      id: "car_003",
      company: "Hertz",
      companyLogo: "/images/companies/hertz-logo.png",
      carModel: "BMW 5 Series",
      rating: 4.8,
      reviewCount: 156,
      pricePerDay: 350,
      currency: "ريال سعودي",
      carImages: ["/photos/car.png", "/photos/car.png", "/photos/car.png"],
      features: [
        "نظام صوتي فاخر",
        "مقاعد كهربائية",
        "أوتوماتيك",
        "248 حصان",
        "محرك 2000 سي سي تيربو",
        "نظام مساعدة القيادة",
      ],
      pickupDate: "الاثنين 26 أكتوبر",
      pickupTime: "11:00 صباحا",
      availableNow: false,
    },
  ];

  return (
    <div className={style.discover}>
      <PageBannerSection
        title="استكشف"
        currentLink="/discover"
        currentPage="استكشف"
      />
      <div className="container">
        <div className=" pt-10 pb-8 my-10 cardS1 bg-white">
          <BussForm />
        </div>
        <Row gutter={[24, 24]}>
          <Col xs={24} md={6}>
            <div className="rounded-[20px] bg-white p-6 flex items-center justify-between mb-6">
              <h4 className="flex items-center gap-2 font-bold text-lg text-[#333]">
                <FaFilter className="text-[#B6B6B6]" />
                التصفية{" "}
              </h4>
              <button className="text-primary">إعادة ظبط</button>
            </div>
            <div className="rounded-[20px] bg-white p-6  mb-6">
              <DiscoverFiltersSection />
            </div>
          </Col>
          <Col xs={24} md={18}>
            <div className="rounded-[20px] bg-white p-6  mb-6">
              {exampleTrips?.map((trip) => (
                <BusTripCard key={trip.id} trip={trip} />
              ))}
              {exampleCars?.map((trip) => (
                <PrivateCarCard key={trip.id} trip={trip} />
              ))}
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};
