import { CategoryType, ProductType } from "@/types/types";
import ProductGrid from "./ProductGrid";

interface AllMainProductsProps {
  products: ProductType[];
  categories: CategoryType[];
}

const AllMainProducts = async ({
  products,
  categories,
}: AllMainProductsProps) => {
  return <ProductGrid products={products} categories={categories} />;
};

export default AllMainProducts;
