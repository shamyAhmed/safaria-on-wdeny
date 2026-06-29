import { CheckoutComponent } from "@/components/checkout/CheckoutComponent";
import { LoaderS1 } from "@/components/tools/loaders/LoaderS1";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "إتمام الشراء",
};

const CartPage: React.FC = (): JSX.Element => {
  return (
    <Suspense fallback={<LoaderS1 />}>
      <CheckoutComponent />
    </Suspense>
  );
};

export default CartPage;
