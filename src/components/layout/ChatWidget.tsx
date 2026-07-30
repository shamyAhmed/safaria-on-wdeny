"use client";

import { useState } from "react";
import { FaXmark } from "react-icons/fa6";
import { IoChatbubbleEllipses } from "react-icons/io5";

export const ChatWidget = () => {
  const [open, setOpen] = useState(false);

  return (
    // Pinned to the start side so it never collides with the scroll-to-top
    // button and the mobile filter buttons, which all sit on `end-6`.
    <div className="fixed bottom-6 start-6 z-50 flex flex-col items-start gap-3">
      {open && (
        <iframe
          src="https://demos.nanovate.io/safaria/widget"
          title="Safaria Booking Assistant"
          width={400}
          height={650}
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          className="w-[calc(100vw-3rem)] max-w-[400px] h-[min(650px,calc(100vh-8rem))] border-0 rounded-2xl shadow-2xl bg-white"
        />
      )}

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-label={open ? "Close booking assistant" : "Open booking assistant"}
        className="flex items-center justify-center w-14 h-14 rounded-full bg-primary text-white shadow-lg transition-transform duration-200 hover:scale-105">
        {open ? <FaXmark size={22} /> : <IoChatbubbleEllipses size={24} />}
      </button>
    </div>
  );
};
