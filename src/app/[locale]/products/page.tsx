// app/[locale]/products/page.tsx
import { getAllCategoriesData } from "@/apiCalls/categories/getAllCategoriesData";
import { getAllProductsData } from "@/apiCalls/products/getAllProductsData";
import { AllProductsComponent } from "@/components/products/AllProductsComponent";
import { LoaderS1 } from "@/components/tools/loaders/LoaderS1";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "All Products - نادي الطائي",
  description: "اكتشف مجموعتنا الكاملة من منتجات نادي الطائي",
};

interface ProductsPageProps {
  searchParams: Promise<{
    page?: string;
    limit?: string;
    category?: string;
    priceRange?: string;
    rating?: string;
    sortBy?: string;
  }>;
}

const ProductsPage = async ({ searchParams }: ProductsPageProps) => {
  try {
    const params = await searchParams;

    const page = parseInt(params.page || "1");
    const limit = parseInt(params.limit || "6");
    const category = params.category;
    const priceRange = params.priceRange;
    const rating = params.rating ? parseInt(params.rating) : undefined;
    const sortBy = params.sortBy ? params.sortBy : undefined;

    // Parse price range
    let minPrice: number | undefined;
    let maxPrice: number | undefined;
    if (priceRange) {
      const [min, max] = priceRange.split("-");
      minPrice = min ? parseFloat(min) : undefined;
      maxPrice = max === "+" ? undefined : max ? parseFloat(max) : undefined;
    }

    const [categoriesData, productsData] = await Promise.all([
      getAllCategoriesData(),
      getAllProductsData({
        page,
        limit,
        categoryId: category,
        minPrice,
        maxPrice,
        minRating: rating,
        sortBy,
      }),
    ]);

    // Handle empty or error responses
    if (!productsData?.success || !categoriesData?.success) {
      return (
        <div className="container py-20 text-center">
          <p className="text-red-500">حدث خطأ في تحميل المنتجات</p>
        </div>
      );
    }

    return (
      <Suspense fallback={<LoaderS1 />}>
        <AllProductsComponent
          categories={categoriesData?.data || []}
          products={productsData?.data}
          initialFilters={{
            category: category || "all",
            priceRange: priceRange || null,
            rating: rating || null,
            sortBy: sortBy as any,
            perPage: limit,
          }}
          initialPage={page}
        />
      </Suspense>
    );
  } catch (error) {
    console.error("Error loading products page:", error);
    return (
      <div className="container py-20 text-center">
        <p className="text-red-500">حدث خطأ في تحميل الصفحة</p>
      </div>
    );
  }
};

export default ProductsPage;
