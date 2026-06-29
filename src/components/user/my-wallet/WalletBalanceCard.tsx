"use client";

import Image from "next/image";
import { Skeleton } from "antd";
import { LuArrowDownToLine } from "react-icons/lu";
import { IoLocationSharp } from "react-icons/io5";

interface WalletBalanceCardProps {
  balance?: string;
  isLoading?: boolean;
}

export const WalletBalanceCard = ({ balance, isLoading }: WalletBalanceCardProps) => {
  return (
    <div className="bg-primary rounded-[24px] px-6 py-4 pb-12 flex flex-col items-center justify-center text-white text-center mb-8 relative overflow-hidden mx-auto max-w-md">
      <IoLocationSharp
        className="absolute bottom-2 end-2 opacity-10"
        size={140}
      />

      {/* brand row */}
      <div
        dir="ltr"
        className="flex items-center w-full justify-start gap-2 mb-5 relative z-10"
      >
        <Image
          src="/images/logo-small.png"
          alt="logo"
          height={24}
          width={24}
          className="size-[24px]"
        />
        <p className="font-bold">Safaria</p>
      </div>

      {/* label */}
      <div className="flex w-full justify-start items-center gap-1.5 text-white/70 text-xs mb-2 relative z-10">
        <LuArrowDownToLine className="text-base" />
        {isLoading ? (
          <Skeleton.Input active size="small" className="!w-32 !h-3 !rounded !bg-white/20 !min-w-0" />
        ) : (
          <span>إجمالي رصيدك الحالي</span>
        )}
      </div>

      {/* amount */}
      <div className="w-full flex items-center mt-5 relative z-10">
        {isLoading ? (
          <Skeleton.Input active size="large" className="!w-48 !h-10 !rounded-lg !bg-white/20 !min-w-0" />
        ) : (
          <p className="text-5xl font-semibold tracking-tight flex items-end gap-2">
            {parseFloat(balance ?? "0").toLocaleString()}
            <span className="text-base mb-1 opacity-70">credits</span>
          </p>
        )}
      </div>
    </div>
  );
};
