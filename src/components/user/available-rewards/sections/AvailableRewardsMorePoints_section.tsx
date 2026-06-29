import { Link } from "@/i18n/navigation";

export const AvailableRewardsMorePoints_section = () => {
  return (
    <div className="more-points container  md:text-center">
      <h5 className="font-bold text-3xl">تحتاج المزيد من النقاط؟</h5>
      <p>تسوق الآن واكسب نقاط مع كل عملية شراء</p>

      <div className="flex sm:flex-col sm:items-center gap-4">
        <Link
          href="/products"
          className="w-fit flex items-center justify-center bg-white  text-primary hover:text-primary px-12 py-2 rounded-lg text-md font-medium"
        >
          تسوق الآن{" "}
        </Link>
      </div>
    </div>
  );
};
