"use client";

import { useState } from "react";
import { Row, Col } from "antd";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "@/components/tools/cards/ProductCard";
import { CategoryType, ProductType } from "@/types/types";

export default function ProductGrid({
  products,
  categories,
}: {
  products: ProductType[];
  categories: CategoryType[];
}) {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredProducts =
    activeCategory === "all"
      ? products
      : products.filter((product) => product.categoryId === activeCategory);

  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-10 text-center">
          <h2 className="mb-6 text-3xl font-bold text-[#111113] md:text-4xl">
            تجربة تسوق ترتقي بذوقك
          </h2>

          {/* Filters */}
          <div className="flex justify-center gap-4 flex-wrap">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-4 py-2 ${
                activeCategory === "all"
                  ? "border-b border-[#3A5762] bg-[#F1F1F1]"
                  : "text-gray-500"
              }`}
            >
              الكل
            </button>

            {categories.map((cat) => (
              <button
                key={cat._id}
                onClick={() => setActiveCategory(cat._id)}
                className={`px-4 py-2 ${
                  activeCategory === cat._id
                    ? "border-b border-[#3A5762] bg-[#F1F1F1]"
                    : "text-gray-500"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <Row gutter={[24, 24]} className="px-10">
          <AnimatePresence mode="popLayout">
            {filteredProducts?.map((product, index) => (
              <Col key={product._id} xs={24} sm={12} lg={8}>
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -20 }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.04,
                  }}
                >
                  <ProductCard product={product} />
                </motion.div>
              </Col>
            ))}
          </AnimatePresence>
        </Row>
      </div>
    </section>
  );
}
