"use client";

import Image from "next/image";
import { FiHeart, FiEye } from "react-icons/fi";
import { ProductType } from "@/types/types";
import { RenderStars } from "@/utils/renderStars";
import { Link } from "@/i18n/navigation";
import { useLocalizedLink } from "@/hooks/useLocalizedLink";
import { useRouter, usePathname } from "@/i18n/navigation";
import toast from "react-hot-toast";
import { getCookie } from "cookies-next";

export default function ProductCard({ product }: { product: ProductType }) {
  const getLink = useLocalizedLink();
  const router = useRouter();
  const pathname = usePathname();
  const UserToken = getCookie("UserToken");

  const isAuthenticated = !!UserToken;

  const handleAddToWishlist = () => {
    if (!isAuthenticated) {
      toast.error("يجب تسجيل الدخول أولاً لإضافة المنتجات إلى المفضلة");
      router.push(getLink(`/auth/login?redirect=${pathname}`));
      return;
    }

    // TODO: Implement wishlist API call
    console.log("Add to wishlist:", product.id);
    toast.success("تمت إضافة المنتج إلى المفضلة");
  };

  return (
    <div className="relative rounded-2xl border-2 border-emerald-200 bg-white p-4 transition-all hover:shadow-lg">
      {/* Discount Badge */}
      {product.discountRate > 0 && (
        <div className="absolute top-4 left-4 z-10">
          <span className="rounded-md bg-red-500 px-2 py-1 text-xs font-medium text-white">
            خصم {product.discountRate}%
          </span>
        </div>
      )}

      {/* Stock Badge */}
      {product.totalStock === 0 && (
        <div className="absolute top-4 left-4 z-10">
          <span className="rounded-md bg-gray-500 px-2 py-1 text-xs font-medium text-white">
            نفذت الكمية
          </span>
        </div>
      )}

      {/* Action Buttons */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
        <button
          type="button"
          onClick={handleAddToWishlist}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 transition-colors hover:border-teal-600 hover:text-teal-600"
          aria-label="Add to wishlist"
        >
          <FiHeart size={18} />
        </button>
        <Link
          href={getLink(`/products/${product.id}`)}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 transition-colors hover:border-teal-600 hover:text-teal-600"
          aria-label="Quick view"
        >
          <FiEye size={18} />
        </Link>
      </div>

      {/* Product Image */}
      <div className="relative mx-auto mb-4 h-[300px] w-full bg-gray-100 rounded-lg overflow-hidden">
        {product?.images[0] ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-gray-400">
            لا توجد صورة
          </div>
        )}
      </div>

      <div className="flex items-end justify-between gap-3">
        <div className="text-right flex-1 min-w-0">
          <Link
            href={getLink(`/products/${product.id}`)}
            className="inline-block mb-1 text-base font-semibold text-gray-800 hover:text-primary line-clamp-2"
          >
            {product.name}
          </Link>
          <div className="mb-1 flex items-center justify-end gap-2">
            {product.discountRate > 0 && (
              <span className="text-sm text-gray-400 line-through">
                {product.currency || "ر.س"} {product.price}
              </span>
            )}
            <span className="text-sm font-bold text-gray-700">
              {product.currency || "ر.س"} {product.finalPrice}
            </span>
          </div>
          <div className="flex items-center justify-start gap-1">
            <RenderStars rating={product.averageRating} />
            {product.reviewCount > 0 && (
              <span className="text-xs text-gray-400 mr-1">
                ({product.reviewCount})
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
