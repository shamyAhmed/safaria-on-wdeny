// app/[locale]/products/[productId]/page.tsx

import {
  getSingleProductData,
  getRelatedProductsData,
} from "@/apiCalls/products/getAllProductsData";
import { SingleProductComponent } from "@/components/products/singleProduct/SingleProductComponent";
import { LoaderS1 } from "@/components/tools/loaders/LoaderS1";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { SEO_COPY, normalizeLocale, pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }) {
  const { locale, productId } = await params;
  const fallback = SEO_COPY.products[normalizeLocale(locale)];
  const path = `/products/${productId}`;

  try {
    const res = await getSingleProductData(productId);
    const product = res?.data;

    return pageMetadata({
      locale,
      path,
      title: product?.name || fallback.title,
      description: product?.description || fallback.description,
      images: product?.image ? [product.image] : undefined,
    });
  } catch {
    return pageMetadata({ locale, path, page: "products" });
  }
}

const ProductPage = async ({ params }) => {
  try {
    const singleProductData = await getSingleProductData(params.productId);

    if (!singleProductData?.success || !singleProductData?.data) {
      notFound();
    }

    const product = singleProductData.data;

    const relatedProductsData = await getRelatedProductsData({
      categoryId: product.categoryId,
      limit: 4,
    });

    return (
      <Suspense fallback={<LoaderS1 />}>
        <SingleProductComponent
          product={product}
          relatedProducts={relatedProductsData?.data?.data?.items || []}
        />
      </Suspense>
    );
  } catch (error) {
    console.error("Product page error:", error);
    notFound();
  }
};

export default ProductPage;
