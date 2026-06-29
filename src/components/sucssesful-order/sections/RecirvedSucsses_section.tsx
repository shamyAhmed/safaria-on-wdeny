import Image from "next/image";
import React from "react";

export const RecirvedSucsses_section = () => {
  return (
    <section className="flex flex-col items-center justify-center mb-10">
      <Image
        src={"/icons/switch.svg"}
        width={100}
        height={100}
        alt="success icon"
      />
      <h3 className="mt-8 mb-6 text-3xl font-bold text-secondary">
        تم استلام طلبك بنجاح! 🎉
      </h3>
      <p className="text-primary text-lg">
        شكراً لك على الشراء من المتجر الرسمي لنادي الطائي
      </p>
    </section>
  );
};
