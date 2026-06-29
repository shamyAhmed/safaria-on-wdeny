import ProductCard from "@/components/tools/cards/ProductCard";
import { ProductType } from "@/types/types";
import { Col, Row } from "antd";
import { AnimatePresence, motion } from "framer-motion";

interface AllProductsSectionProps {
  paginatedProducts: ProductType[];
}
export const AllProductsSection = ({
  paginatedProducts,
}: AllProductsSectionProps) => {
  return (
    <section>
      {/* Products Grid */}
      <Row gutter={[24, 24]}>
        <AnimatePresence mode="popLayout">
          {paginatedProducts.map((product, index) => (
            <Col key={product.id} xs={24} sm={12} lg={8}>
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.05,
                  ease: "easeOut",
                }}
              >
                <ProductCard product={product} />
              </motion.div>
            </Col>
          ))}
        </AnimatePresence>
      </Row>

      {/* Empty State */}
      {paginatedProducts.length === 0 && (
        <div className="py-20 text-center">
          <p className="text-lg text-gray-500">
            لم يتم العثور على منتجات تطابق معايير البحث
          </p>
        </div>
      )}
    </section>
  );
};
