// components/products/singleProduct/sections/RelatedProductsSection.tsx
import ProductCard from "@/components/tools/cards/ProductCard";
import { Col, Row } from "antd";
import { useParams } from "next/navigation";

interface RelatedProductsSectionProps {
  relatedProducts: any[];
}

export const RelatedProductsSection = ({
  relatedProducts,
}: RelatedProductsSectionProps) => {
  const { productId } = useParams();
  if (!relatedProducts || relatedProducts.length === 0) {
    return null;
  }

  return (
    <section>
      <h2 className="my-8 font-bold text-2xl">منتجات ذات صلة</h2>
      <Row gutter={[24, 24]}>
        {relatedProducts
          .filter((product) => product._id !== productId)
          .map((product) => (
            <Col key={product._id} xs={24} sm={12} lg={6}>
              <ProductCard
                product={{ ...product, image: product?.images[0] }}
              />
            </Col>
          ))}
      </Row>
    </section>
  );
};
