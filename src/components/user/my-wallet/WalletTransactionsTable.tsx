"use client";

import { useState, useMemo } from "react";
import { Table, Select, Pagination } from "antd";
import type { ColumnsType } from "antd/es/table";
import { TbWalletOff } from "react-icons/tb";
import { useTranslations } from "next-intl";
import type { WalletTransaction } from "@/app/[locale]/_types/Api";

// ─── Badge ────────────────────────────────────────────────────────────────────

// The API sends the type as a machine code, so the colour is picked here and
// the label comes from the message files.
const TYPE_CLASSES: Record<string, string> = {
  deposit: "bg-green-50 text-green-600 border border-green-200",
  booking: "bg-rose-50 text-rose-400 border border-rose-200",
  refund: "bg-orange-50 text-orange-400 border border-orange-200",
};

const TxBadge = ({ type }: { type: string }) => {
  const t = useTranslations("wallet.transactionTypes");
  const className =
    TYPE_CLASSES[type] ?? "bg-gray-50 text-gray-500 border border-gray-200";
  return (
    <span
      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {TYPE_CLASSES[type] ? t(type) : type}
    </span>
  );
};

// ─── Columns ──────────────────────────────────────────────────────────────────

const buildColumns = (
  t: (key: string) => string,
): ColumnsType<WalletTransaction> => [
  {
    title: t("columns.id"),
    dataIndex: "id",
    key: "id",
    align: "right",
    minWidth: 200,
    render: (id: number) => (
      <span className="font-semibold text-gray-700">#{id}</span>
    ),
  },
  {
    title: t("columns.type"),
    dataIndex: "type",
    key: "type",
    align: "center",
    minWidth: 200,
    render: (type: string) => <TxBadge type={type} />,
  },
  {
    title: t("columns.description"),
    dataIndex: "description",
    key: "description",
    align: "center",
    minWidth: 200,
    render: (desc: string) => (
      <span className="text-gray-500 text-sm">{desc}</span>
    ),
  },
  {
    title: t("columns.amount"),
    dataIndex: "amount",
    key: "amount",
    align: "left",
    minWidth: 200,
    render: (amount: string) => {
      const value = parseFloat(amount);
      return (
        <span
          className={`font-bold text-sm ${value > 0 ? "text-green-500" : "text-rose-500"}`}
        >
          {value > 0 ? `+${value.toLocaleString()}` : value.toLocaleString()}{" "}
          <span className="font-normal text-xs opacity-60">{t("credits")}</span>
        </span>
      );
    },
  },
];

// ─── Filter options ───────────────────────────────────────────────────────────

const TYPE_FILTERS = ["all", "deposit", "booking", "refund"] as const;

const PAGE_SIZE = 5;

// ─── Component ────────────────────────────────────────────────────────────────

interface WalletTransactionsTableProps {
  transactions: WalletTransaction[];
  isLoading?: boolean;
}

export const WalletTransactionsTable = ({
  transactions,
  isLoading,
}: WalletTransactionsTableProps) => {
  const t = useTranslations("wallet");
  const [typeFilter, setTypeFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = useMemo(() => {
    if (typeFilter === "all") return transactions;
    return transactions.filter((tx) => tx.type === typeFilter);
  }, [transactions, typeFilter]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredData.slice(start, start + PAGE_SIZE);
  }, [filteredData, currentPage]);

  const columns = useMemo(() => buildColumns(t), [t]);

  const typeOptions = TYPE_FILTERS.map((value) => ({
    value,
    label: value === "all" ? t("allTypes") : t(`transactionTypes.${value}`),
  }));

  return (
    <>
      {/* Section header */}
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <h3 className="text-lg font-bold text-gray-700">{t("historyTitle")}</h3>
        <Select
          value={typeFilter}
          onChange={(v) => {
            setTypeFilter(v);
            setCurrentPage(1);
          }}
          options={typeOptions}
          className="sort-dropdown !min-w-[130px]"
          popupMatchSelectWidth={false}
        />
      </div>

      {isLoading || filteredData.length > 0 ? (
        <>
          <div className="rounded-2xl overflow-x-auto border border-gray-100 max-w-full">
            <Table<WalletTransaction>
              dataSource={paginatedData}
              columns={columns}
              loading={isLoading}
              pagination={false}
              bordered={false}
              className="wallet-table"
              rowKey="id"
            />
          </div>

          {!isLoading && (
            <div className="flex items-center justify-between mt-6 flex-wrap gap-3">
              <Pagination
                current={currentPage}
                pageSize={PAGE_SIZE}
                total={filteredData.length}
                onChange={setCurrentPage}
                showSizeChanger={false}
                className="wallet-pagination"
              />
              <span className="text-xs text-gray-400">
                {t("showingCount", {
                  shown: Math.min(currentPage * PAGE_SIZE, filteredData.length),
                  total: filteredData.length,
                })}
              </span>
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-5">
            <TbWalletOff className="text-4xl text-gray-300" />
          </div>
          <h3 className="text-lg font-semibold text-gray-600 mb-2">
            {t("empty.title")}
          </h3>
          <p className="text-sm text-gray-400 max-w-xs">
            {t("empty.description")}
          </p>
        </div>
      )}
    </>
  );
};
