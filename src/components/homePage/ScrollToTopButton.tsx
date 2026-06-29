"use client";

import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa6";

export const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Scroll to top"
      className={`fixed bottom-6 end-6 z-50 flex items-center justify-center transition-all duration-300 ${
        visible ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"
      }`}>
      {/* Inner solid circle */}
      <span className="relative z-10 flex items-center justify-center w-11 h-11 rounded-full bg-primary text-white shadow-lg">
        <FaArrowUp size={15} />
      </span>
    </button>
  );
};
