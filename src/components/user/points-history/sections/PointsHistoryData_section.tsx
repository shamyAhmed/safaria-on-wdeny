"use client";
import { Table, Tag } from "antd";
import { LuFilter } from "react-icons/lu";
import { BsDownload } from "react-icons/bs";
import { useMemo, useState } from "react";
import { CiCalendar } from "react-icons/ci";
import { PiShoppingBagBold } from "react-icons/pi";
import { FiGift } from "react-icons/fi";
import { ColumnsType } from "antd/es/table";
type PointsHistoryRow = {
  key: number;
  date: string;
  description: string;
  category: string;
  points: number;
};

const dataSource: PointsHistoryRow[] = [
  {
    key: 1,
    date: "25 ديسمبر 2025",
    description: "شراء طقم كامل - طلب #12345",
    category: "عملية شراء",
    points: 200,
  },
  {
    key: 2,
    date: "23 ديسمبر 2025",
    description: "استبدال قسيمة خصم 50 ريال",
    category: "خصم",
    points: -500,
  },
  {
    key: 3,
    date: "21 ديسمبر 2025",
    description: "شراء تيشيرت نادي الأهلي - طلب #12340",
    category: "عملية شراء",
    points: 150,
  },
  {
    key: 4,
    date: "19 ديسمبر 2025",
    description: "استبدال شحن مجاني",
    category: "شحن",
    points: -300,
  },
];

const columns: ColumnsType<PointsHistoryRow> = [
  {
    title: "التاريخ",
    dataIndex: "date",
    key: "date",
    align: "right",
    render: (date: string) => (
      <span className="text-[#111113] flex items-center gap-2">
        <CiCalendar className="text-[#B0B0B3]" />
        {date}
      </span>
    ),
  },
  {
    title: "الوصف",
    dataIndex: "description",
    key: "description",
    render: (_: any, record: { points: number; description: string }) => (
      <span className="text-gray-700 flex items-center gap-2">
        {record.points > 0 ? (
          <PiShoppingBagBold className="text-green-500" />
        ) : (
          <FiGift className="text-primary" />
        )}

        {record.description}
      </span>
    ),
  },

  {
    title: "الفئة",
    dataIndex: "category",
    key: "category",
    render: (category: string) => (
      <Tag className="rounded-full  px-3 py-1 !text-[#B0B0B3] !bg-[#F1F1F1] !border-0">
        {category}
      </Tag>
    ),
  },

  {
    title: "النقاط",
    dataIndex: "points",
    key: "points",
    align: "left",
    render: (points: number) => (
      <span
        className={`font-bold text-lg ${
          points > 0 ? "text-green-500" : "text-gray-700"
        }`}
      >
        {points > 0 ? `+${points}` : points}
      </span>
    ),
  },
];

export const PointsHistoryData_section = () => {
  const [filterType, setFilterType] = useState("all");

  const filteredData = useMemo(() => {
    switch (filterType) {
      case "earned":
        return dataSource.filter((item) => item.points > 0);

      case "redeemed":
        return dataSource.filter((item) => item.points < 0);

      default:
        return dataSource;
    }
  }, [filterType]);

  return (
    <section className="points-history-data my-24 w-full">
      <div className="container">
        <div className="top flex items-center justify-between mb-4 gap-4 sm:flex-col">
          <div className="flex items-center gap-2">
            <LuFilter className="text-lg text-[#B0B0B3]" />
            <button
              className={filterType === "all" ? "active" : ""}
              onClick={() => setFilterType("all")}
            >
              الكل
            </button>
            <button
              className={`exchange ${filterType === "earned" ? "active" : ""}`}
              onClick={() => setFilterType("earned")}
            >
              المكتسب
            </button>
            <button
              className={`redeemed ${
                filterType === "redeemed" ? "active" : ""
              }`}
              onClick={() => setFilterType("redeemed")}
            >
              المستبدل
            </button>
          </div>

          <button className="flex items-center gap-1">
            <BsDownload />
            تصدير PDF
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <Table
            dataSource={filteredData}
            columns={columns}
            pagination={false}
            bordered={false}
            className="points-table"
          />
        </div>
      </div>
    </section>
  );
};
