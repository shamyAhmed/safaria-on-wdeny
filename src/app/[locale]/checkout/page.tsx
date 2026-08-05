import { CheckoutComponent } from "@/components/checkout/CheckoutComponent";
import { LoaderS1 } from "@/components/tools/loaders/LoaderS1";
import { Metadata } from "next";
import { Suspense } from "react";
import { privatePageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return privatePageMetadata("checkout", locale);
}

const CartPage: React.FC = (): JSX.Element => {
  return (
    <Suspense fallback={<LoaderS1 />}>
      <CheckoutComponent />
    </Suspense>
  );
};

export default CartPage;
