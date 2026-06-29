"use client";

import useEditAddress from "@/app/[locale]/_hooks/useEditAddress";
import type { UserAddress } from "@/app/[locale]/_hooks/useGetUserAddresses";
import { AddAddressModal } from "./AddAddressModal";

interface EditAddressModalProps {
  open: boolean;
  onClose: () => void;
  address: UserAddress;
}

export const EditAddressModal = ({ open, onClose, address }: EditAddressModalProps) => {
  const { mutate: editAddress, isPending } = useEditAddress(address.id, onClose);

  return (
    <AddAddressModal
      open={open}
      onClose={onClose}
      address={address}
      mutate={editAddress}
      isPending={isPending}
    />
  );
};
