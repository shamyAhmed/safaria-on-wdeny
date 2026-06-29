"use client";

import { useState } from "react";
import { Button } from "antd";
import { RiAddLine } from "react-icons/ri";
import { WalletBalanceCard } from "./WalletBalanceCard";
import { WalletTransactionsTable } from "./WalletTransactionsTable";
import { AddCreditModal } from "./AddCreditModal";
import { useGetWallet } from "@/hooks/auth/useGetWallet";

export const MyWalletContent = () => {
  const [creditModalOpen, setCreditModalOpen] = useState(false);
  const { wallet, isLoading } = useGetWallet();

  const walletData = wallet?.[0];

  return (
    <div className="formS1 !border-none">
      {/* ── Page Header ──────────────────────────────────────────────── */}
      <div className="flex items-start justify-between flex-wrap gap-4 border-b border-[#E2E2E2] pb-6 mb-8">
        <div>
          <h2 className="text-2xl font-bold">محفظتي</h2>
          <p className="text-sm text-gray-400 mt-1">
            ادر اموالك واطلع على سجل عملياتك المالية
          </p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
<Button
            type="primary"
            icon={<RiAddLine className="text-lg" />}
            iconPosition="end"
            className="!flex !items-center !gap-1"
            onClick={() => setCreditModalOpen(true)}
          >
            إضافة رصيد
          </Button>
        </div>
      </div>

      <WalletBalanceCard balance={walletData?.balance} isLoading={isLoading} />

      <WalletTransactionsTable
        transactions={walletData?.transactions ?? []}
        isLoading={isLoading}
      />

      <AddCreditModal
        open={creditModalOpen}
        onClose={() => setCreditModalOpen(false)}
      />
    </div>
  );
};
