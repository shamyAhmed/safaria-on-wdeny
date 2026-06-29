// components/products/singleProduct/SingleProductComponent.tsx
"use client";
import { ProductType } from "@/types/types";
import { ProductDetails } from "./sections/ProductDetailsSection";
import { ProductInfoSection } from "./sections/ProductInfoSection";
import { RelatedProductsSection } from "./sections/RelatedProductsSection";
import style from "./styles/singleProduct.module.scss";

interface SingleProductComponentProps {
  product: ProductType;
  relatedProducts: any[];
}

export const SingleProductComponent = ({
  product,
  relatedProducts,
}: SingleProductComponentProps) => {
  return (
    <div className={`${style.singleProduct} mt-[100px] mb-[90px]`}>
      <div className="container">
        <ProductInfoSection product={product} />
        <ProductDetails product={product} />
        <RelatedProductsSection relatedProducts={relatedProducts} />
      </div>
    </div>
  );
};
