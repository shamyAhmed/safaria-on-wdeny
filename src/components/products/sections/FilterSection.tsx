import { FilterState } from "@/types/types";
import { Col, Row, Select } from "antd";
import { useMemo } from "react";
import { IoClose } from "react-icons/io5";

const priceRanges = [
  { value: "0-50", label: "0 - 50 ر.س" },
  { value: "50-100", label: "50 - 100 ر.س" },
  { value: "100-200", label: "100 - 200 ر.س" },
  { value: "200-+", label: "200+ ر.س" },
];

const ratingOptions = [
  { value: 5, label: "5 نجوم" },
  { value: 4, label: "4 نجوم فأكثر" },
  { value: 3, label: "3 نجوم فأكثر" },
];

const sortOptions = [
  { value: "price", label: "السعر" },
  { value: "createdAt", label: "وقت الانشاء" },
  { value: "name", label: "الاسم" },
  { value: "averageRating", label: "متوسط التقييم" },
];

const perPageOptions = [
  { value: 6, label: "6" },
  { value: 12, label: "12" },
  { value: 16, label: "16" },
  { value: 24, label: "24" },
];

interface Category {
  id: string;
  slug: string;
  name: string;
  label: string;
}

interface FilterSectionProps {
  filters: FilterState;
  setFilters: (filters: Partial<FilterState>) => void;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  filteredProducts: any[];
  totalProducts: number;
  categories: Category[];
}

export const FilterSection = ({
  filters,
  setFilters,
  setCurrentPage,
  filteredProducts,
  totalProducts,
  categories,
}: FilterSectionProps) => {
  const removeFilter = (key: string) => {
    setFilters({
      [key]: key === "category" ? "all" : null,
    });
    setCurrentPage(1);
  };

  // Active filters for display
  const activeFilters = useMemo(() => {
    const active: { key: string; label: string }[] = [];

    if (filters.category !== "all") {
      const cat = categories.find(
        (c) => c.id === filters.category || c.slug === filters.category
      );
      if (cat) active.push({ key: "category", label: cat.name || cat.label });
    }

    if (filters.priceRange) {
      const range = priceRanges.find((r) => r.value === filters.priceRange);
      if (range)
        active.push({
          key: "priceRange",
          label: `السعر: ${range.label}`,
        });
    }

    if (filters.rating) {
      active.push({ key: "rating", label: `${filters.rating} نجوم فأكثر` });
    }

    return active;
  }, [filters, categories]);

  // Transform categories for select options
  const categoryOptions = useMemo(() => {
    return categories
      .filter((c) => c.id !== "all" && c.slug !== "all")
      .map((c) => ({
        value: c.id,
        label: c.name || c.label,
      }));
  }, [categories]);

  return (
    <div className="container">
      <Row gutter={[16, 16]} align="middle" justify="space-between">
        <Col xs={24} lg={12}>
          <div className="flex flex-wrap flex-col md:flex-row items-center gap-3">
            <div className="selectS1 w-full md:w-fit">
              <Select
                placeholder="اختر الفئة"
                allowClear
                style={{ minWidth: 140 }}
                className="w-full"
                options={categoryOptions}
                value={
                  filters.category !== "all" ? filters.category : undefined
                }
                onChange={(value) => {
                  setFilters({ category: value || "all" });
                  setCurrentPage(1);
                }}
              />
            </div>

            <div className="selectS1 w-full md:w-fit">
              <Select
                placeholder="اختر السعر"
                allowClear
                style={{ minWidth: 140 }}
                className="w-full"
                options={priceRanges}
                value={filters.priceRange}
                onChange={(value) => {
                  setFilters({ priceRange: value });
                  setCurrentPage(1);
                }}
              />
            </div>

            <div className="selectS1 w-full md:w-fit">
              <Select
                placeholder="اختر التقييم"
                allowClear
                style={{ minWidth: 140 }}
                className="w-full"
                options={ratingOptions}
                value={filters.rating}
                onChange={(value) => {
                  setFilters({ rating: value });
                  setCurrentPage(1);
                }}
              />
            </div>
          </div>
        </Col>

        <Col xs={24} lg={8}>
          <div className="flex flex-wrap items-center justify-start gap-3 lg:justify-end">
            <div className="selectS1 flex-1">
              <Select
                style={{ width: 70 }}
                options={perPageOptions}
                value={filters.perPage}
                className="!w-full"
                prefix={<span className="text-sm text-gray-500">عرض:</span>}
                onChange={(value) => {
                  setFilters({ perPage: value });
                  setCurrentPage(1);
                }}
              />
            </div>
            <div className="selectS1 flex-1">
              <Select
                style={{ minWidth: 180 }}
                className="w-full"
                options={sortOptions}
                value={filters.sortBy}
                allowClear
                onChange={(value) => setFilters({ sortBy: value })}
                suffixIcon={null}
                prefix={<span className="text-sm text-gray-500">الترتيب:</span>}
              />
            </div>
          </div>
        </Col>
      </Row>

      {/* Active Filters & Results Count */}
      {(activeFilters.length > 0 || totalProducts > 0) && (
        <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            تم العثور على{" "}
            <span className="font-semibold text-gray-700">{totalProducts}</span>{" "}
            {totalProducts === 1 ? "منتج" : "منتجات"}
          </p>

          <div className="flex flex-wrap items-center gap-2 min-h-8">
            {activeFilters.length > 0 && (
              <>
                <span className="text-sm text-[#9D9DA1]">الفلاتر النشطة:</span>
                {activeFilters.map((filter) => (
                  <button
                    key={filter.key}
                    type="button"
                    onClick={() => removeFilter(filter.key)}
                    className="flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700 transition-colors hover:bg-gray-200"
                  >
                    {filter.label}
                    <IoClose className="text-gray-500" />
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    setFilters({
                      category: "all",
                      priceRange: null,
                      rating: null,
                      sortBy: "newest",
                      perPage: 6,
                    });
                    setCurrentPage(1);
                  }}
                  className="text-sm text-red-500 hover:text-red-700 underline"
                >
                  مسح الكل
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
