// components/products/singleProduct/sections/ProductInfoSection.tsx
"use client";

import { RenderStars } from "@/utils/renderStars";
import { Button, Col, Row, Space, Typography } from "antd";
import { useState } from "react";
import { CiShare2 } from "react-icons/ci";
import Image from "next/image";
import QuantityInput from "@/components/tools/inputs/QuantityInput";
import { FiTruck, FiShield } from "react-icons/fi";
import { TbReload } from "react-icons/tb";
import toast from "react-hot-toast";
import { ProductType } from "@/types/types";

interface ProductInfoSectionProps {
  product: ProductType;
}

export const ProductInfoSection = ({ product }: ProductInfoSectionProps) => {
  const [activeImage, setActiveImage] = useState(
    product?.images[0] || "/placeholder.jpg"
  );
  const [size, setSize] = useState(product.availableSizes[0] || "M");
  const [quantity, setQuantity] = useState(1);

  const productUrl = typeof window !== "undefined" ? window.location.href : "";

  // Check if product is in stock
  const isInStock = product.totalStock > 0;

  // Get stock for selected size
  const selectedSizeStock =
    product.items.find((item) => item.size === size)?.stock || 0;

  // Calculate discount percentage
  const discountPercentage = product.discountRate;

  const handleShareLink = () => {
    if (navigator.share) {
      navigator
        .share({
          title: product.name,
          url: productUrl,
        })
        .catch((err) => console.log("Error sharing:", err));
    } else {
      navigator.clipboard?.writeText(productUrl);
      toast.success("تم نسخ الرابط");
    }
  };

  return (
    <section>
      <Row gutter={[64, 64]}>
        <Col span={24} md={12}>
          <div>
            {/* Main Image */}
            <div className="relative mx-auto mb-4 h-[400px] w-full bg-gray-100 rounded-lg overflow-hidden">
              <Image
                src={activeImage}
                fill
                className="object-contain"
                alt={product.name}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
                priority
              />
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto justify-center">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(img)}
                    className={`relative h-20 w-20 flex-shrink-0 rounded-lg border transition
                      ${
                        activeImage === img
                          ? "border-primary ring-2 ring-primary/30"
                          : "border-gray-200 hover:border-gray-400"
                      }
                    `}
                  >
                    <Image
                      src={img}
                      fill
                      className="object-contain p-2"
                      alt={`${product.name} - صورة ${index + 1}`}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </Col>
        <Col span={24} md={12}>
          <div>
            <h1 className="text-3xl font-bold text-secondary mb-4">
              {product.name}
            </h1>

            <div className="flex items-center justify-start gap-2">
              <RenderStars rating={product.averageRating} />
              <span className="flex ms-2">
                {product.averageRating.toFixed(1)} ({product.reviewCount} تقييم)
              </span>
            </div>

            <div className="mb-1 flex items-center gap-2 mt-2">
              <span className="text-xl font-bold text-gray-700">
                {product.finalPrice} {product.currency}
              </span>

              {product.discountRate > 0 && (
                <>
                  <span className="text-xl text-gray-400 line-through">
                    {product.price} {product.currency}
                  </span>
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                    خصم {discountPercentage}%
                  </span>
                </>
              )}
            </div>

            <span
              className={`${
                isInStock ? "bg-primary" : "bg-red-500"
              } text-white text-[12px] px-2 rounded-lg inline-block my-6`}
            >
              {isInStock ? "متوفر في المخزون" : "غير متوفر"}
            </span>

            <div className="space-y-6 text-right">
              {/* Size Selection */}
              {product.availableSizes.length > 0 && (
                <div className="border-t border-[#e5e5e5] pt-6">
                  <Typography.Text className="block mb-3 font-medium">
                    اختر المقاس
                  </Typography.Text>

                  <Space wrap>
                    {product.availableSizes.map((s) => {
                      const sizeStock =
                        product.items.find((item) => item.size === s)?.stock ||
                        0;
                      const isSizeAvailable = sizeStock > 0;

                      return (
                        <button
                          key={s}
                          onClick={() => isSizeAvailable && setSize(s)}
                          disabled={!isSizeAvailable}
                          className={`w-14 h-14 rounded-lg border-2 transition ${
                            !isSizeAvailable
                              ? "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed"
                              : size === s
                                ? "bg-primary text-white border-primary"
                                : "border-[#E5E7EB] hover:border-primary"
                          }`}
                        >
                          {s}
                        </button>
                      );
                    })}
                  </Space>

                  {selectedSizeStock > 0 && (
                    <p className="text-sm text-gray-500 mt-2">
                      متوفر: {selectedSizeStock} قطعة
                    </p>
                  )}
                </div>
              )}

              {/* Quantity */}
              <div>
                <Typography.Text className="block mb-3 font-medium">
                  الكمية
                </Typography.Text>
                <QuantityInput
                  value={quantity}
                  onChange={setQuantity}
                  max={selectedSizeStock}
                  min={1}
                />
              </div>

              {/* Share */}
              <div className="flex items-center gap-4">
                <button
                  onClick={handleShareLink}
                  className="w-12 h-12 flex items-center justify-center rounded-lg border-2 border-primary text-primary text-2xl hover:bg-primary hover:text-white transition"
                >
                  <CiShare2 />
                </button>
              </div>
            </div>

            {/* Features */}
            <ul className="flex flex-col gap-4 border-t border-[#e5e5e5] pt-6 mt-6">
              <li className="flex items-center gap-4">
                <div className="w-12 h-12 flex items-center justify-center bg-[#F1F5F9] text-[#22C55E] rounded-full text-xl">
                  <FiTruck />
                </div>
                <div className="flex flex-col">
                  <span className="text-primary">شحن مجاني</span>
                  <span className="text-[#2D2D31]">للطلبات فوق 200 ر.س</span>
                </div>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-12 h-12 flex items-center justify-center bg-[#F1F5F9] text-[#22C55E] rounded-full text-xl">
                  <TbReload />
                </div>
                <div className="flex flex-col">
                  <span className="text-primary">إرجاع مجاني</span>
                  <span className="text-[#2D2D31]">خلال 14 يوم من الشراء</span>
                </div>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-12 h-12 flex items-center justify-center bg-[#F1F5F9] text-[#22C55E] rounded-full text-xl">
                  <FiShield />
                </div>
                <div className="flex flex-col">
                  <span className="text-primary">منتج أصلي</span>
                  <span className="text-[#2D2D31]">100% من نادي الطائي</span>
                </div>
              </li>
            </ul>
          </div>
        </Col>
      </Row>
    </section>
  );
};
