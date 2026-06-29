// components/products/singleProduct/sections/ProductDetailsSection.tsx
import { Tabs, TabsProps } from "antd";

interface ProductDetailsProps {
  product: {
    description: string;
    reviewCount: number;
    color?: string;
    availableSizes?: string[];
    currency?: string;
  };
}

export const ProductDetails = ({ product }: ProductDetailsProps) => {
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "وصف المنتج",
      children: (
        <div>
          <h4 className="my-8 font-bold text-xl">وصف المنتج</h4>
          <p className="text-[#9D9DA1] whitespace-pre-wrap">
            {product.description || "لا يوجد وصف متاح"}
          </p>
        </div>
      ),
    },
    {
      key: "2",
      label: `التقييمات (${product.reviewCount})`,
      children: (
        <div>
          <h4 className="my-8 font-bold text-xl">التقييمات</h4>
          <p className="text-[#9D9DA1]">لا توجد تقييمات بعد</p>
        </div>
      ),
    },
    {
      key: "3",
      label: "المواصفات",
      children: (
        <div>
          <h4 className="my-8 font-bold text-xl">المواصفات</h4>
          <ul className="space-y-2 text-[#9D9DA1]">
            {product.color && (
              <li>
                <strong>اللون:</strong> {product.color}
              </li>
            )}
            {product.availableSizes && product.availableSizes.length > 0 && (
              <li>
                <strong>المقاسات المتوفرة:</strong>{" "}
                {product.availableSizes.join(", ")}
              </li>
            )}
          </ul>
        </div>
      ),
    },
  ];

  return (
    <section className="product-details-tabs my-20">
      <Tabs defaultActiveKey="1" items={items} className="tabsS1" />
    </section>
  );
};
