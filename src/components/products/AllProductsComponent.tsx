// components/products/AllProductsComponent.tsx
"use client";
import { FilterState, ProductType } from "@/types/types";
import { Suspense, useMemo, useState, useEffect, useTransition } from "react";
import { FilterSection } from "./sections/FilterSection";
import { Pagination } from "antd";
import { AllProductsSection } from "./sections/AllProductsSection";
import { LoaderS1 } from "../tools/loaders/LoaderS1";
import { useSearchParams } from "next/navigation";
import { useRouter, usePathname } from "@/i18n/navigation";
import { ProductsLoader } from "../tools/loaders/ProductsLoader";

interface ApiCategory {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  id: string;
}

interface AllProductsComponentProps {
  categories: ApiCategory[];
  products: {
    items: ProductType[];
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  initialFilters: FilterState;
  initialPage: number;
}

export const AllProductsComponent = ({
  categories,
  products,
  initialFilters,
  initialPage,
}: AllProductsComponentProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [currentPage, setCurrentPage] = useState(initialPage);

  // Transform API categories
  const allCategories = useMemo(() => {
    const transformedCategories =
      categories?.map((cat) => ({
        id: cat.id || cat._id,
        slug: cat.slug,
        name: cat.name,
        label: cat.name,
      })) || [];

    return [
      { id: "all", slug: "all", name: "الكل", label: "الكل" },
      ...transformedCategories,
    ];
  }, [categories]);

  // Update URL when filters or page changes
  const updateURL = (newFilters: FilterState, page: number) => {
    const params = new URLSearchParams();

    if (page > 1) params.set("page", page.toString());
    if (newFilters.perPage !== 6)
      params.set("limit", (newFilters.perPage ?? 6).toString());
    if (newFilters.category !== "all")
      params.set("category", newFilters.category ?? "all");
    if (newFilters.priceRange) params.set("priceRange", newFilters.priceRange);
    if (newFilters.rating) params.set("rating", newFilters.rating.toString());
    if (newFilters.sortBy !== "newest")
      params.set("sortBy", newFilters.sortBy ?? "");

    const queryString = params.toString();
    const newUrl = queryString ? `${pathname}?${queryString}` : pathname;

    startTransition(() => {
      router.push(newUrl, { scroll: false });
    });
  };

  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    setCurrentPage(1);
    updateURL(updatedFilters, 1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    updateURL(filters, page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="pb-[150px] pt-5 text-center lg:text-center">
      <div className="container">
        <div className="mb-20">
          <h1 className="text-3xl font-bold text-gray-800 md:text-4xl">
            جميع المنتجات
          </h1>
          <p className="mt-2 text-secondary">
            اكتشف مجموعتنا الكاملة من منتجات نادي الطائي
          </p>
        </div>

        <FilterSection
          filters={filters}
          setCurrentPage={setCurrentPage}
          setFilters={handleFilterChange}
          filteredProducts={products.items}
          totalProducts={products.total}
          categories={allCategories}
        />

        <div className="">
          {/* Section Header */}
          <div className="my-14 text-center">
            <h2 className="mb-6 text-3xl sm:text-2xl font-bold text-gray-800 md:text-4xl">
              تجربة تسوق ترتقي بذوقك
            </h2>

            {/* Category Tabs */}
            <div className="flex items-center justify-center gap-4 flex-wrap">
              {allCategories.map((category, index) => (
                <div key={category.id} className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      handleFilterChange({ category: category.id });
                    }}
                    className={`px-4 py-2 text-sm font-medium transition-all ${
                      filters.category === category.id
                        ? "rounded-md border border-gray-300 text-gray-800"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                    disabled={isPending}
                  >
                    {category.name}
                  </button>
                  {index < allCategories.length - 1 && (
                    <span className="text-gray-300">|</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Products Section with Loading State */}
          {isPending ? (
            <ProductsLoader />
          ) : (
            <Suspense fallback={<ProductsLoader />}>
              {products.items.length > 0 ? (
                <AllProductsSection paginatedProducts={products.items} />
              ) : (
                <div className="text-center py-20">
                  <p className="text-gray-500 text-lg">لا توجد منتجات متاحة</p>
                </div>
              )}
            </Suspense>
          )}

          {/* Pagination */}
          {products.total > (filters.perPage ?? 6) && (
            <div className="mt-12 flex justify-center pagination-wrapper">
              <Pagination
                current={currentPage}
                total={products.total}
                pageSize={filters.perPage}
                onChange={handlePageChange}
                showSizeChanger={false}
                disabled={isPending}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
