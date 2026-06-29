"use client";

import { useState } from "react";
import { Button } from "antd";
import { RiMapPinAddLine } from "react-icons/ri";
import { FiMapPin } from "react-icons/fi";
import { AddressCard, AddressCardSkeleton } from "./AddressCard";
import { AddAddressModal } from "./AddAddressModal";
import { EditAddressModal } from "./EditAddressModal";
import { DeleteAddressModal } from "./DeleteAddressModal";
import useGetUserAddresses, { type UserAddress } from "@/app/[locale]/_hooks/useGetUserAddresses";

export const SavedAddressesContent = () => {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editAddress, setEditAddress] = useState<UserAddress | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const { data: addresses = [], isLoading } = useGetUserAddresses();

  return (
    <div className="formS1 !border-none">
      {/* ── Header ───────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between flex-wrap gap-4 border-b border-[#E2E2E2] pb-6 mb-6">
        <h2 className="text-2xl font-bold">العناوين المحفوظة</h2>
      </div>

      <div className="flex justify-between items-center mb-4">
        <span className="text-sm text-gray-400">
          يوجد{" "}
          <span className="font-semibold text-gray-600">{addresses.length}</span>{" "}
          من النتائج
        </span>
        <Button
          type="primary"
          icon={<RiMapPinAddLine className="text-base" />}
          iconPosition="end"
          className="!flex !items-center !gap-2"
          onClick={() => setAddModalOpen(true)}
        >
          إضافة عنوان جديد
        </Button>
      </div>

      {/* ── Address list / skeleton / empty state ─────────────────────── */}
      {isLoading ? (
        <div>
          {Array.from({ length: 3 }).map((_, i) => (
            <AddressCardSkeleton key={i} />
          ))}
        </div>
      ) : addresses.length > 0 ? (
        <div>
          {addresses.map((address) => (
            <AddressCard
              key={address.id}
              address={address}
              onEdit={() => setEditAddress(address)}

              onDelete={(id) => setDeleteId(id)}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-5">
            <FiMapPin className="text-4xl text-gray-300" />
          </div>
          <h3 className="text-lg font-semibold text-gray-600 mb-2">
            لا توجد عناوين محفوظة
          </h3>
          <p className="text-sm text-gray-400 max-w-xs">
            لم تقم بحفظ أي عنوان حتى الآن. أضف عنوانك الأول لتسهيل عمليات الحجز.
          </p>
        </div>
      )}

      <AddAddressModal
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
      />

      {editAddress && (
        <EditAddressModal
          open={true}
          onClose={() => setEditAddress(null)}
          address={editAddress}
        />
      )}

      <DeleteAddressModal
        open={deleteId !== null}
        addressId={deleteId}
        onClose={() => setDeleteId(null)}
      />
    </div>
  );
};
