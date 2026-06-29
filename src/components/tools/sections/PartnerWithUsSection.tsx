"use client";
import { ReactNode, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface PartnerWithUsSectionProps {
  title: string;
  desc: string;
  children: ReactNode;
}

export const PartnerWithUsSection = ({
  title,
  desc,
  children,
}: PartnerWithUsSectionProps): JSX.Element => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".partner-heading", {
        opacity: 0,
        y: 60,
        duration: 2, // ⬅️ slower animation
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      gsap.from(".partner-desc", {
        opacity: 0,
        y: 40,
        duration: 2,
        delay: 0.3,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      gsap.from(".partner-children", {
        opacity: 0,
        scale: 0.95,
        duration: 2,
        delay: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="partner-with-us-section py-16 text-center"
    >
      {/* <h3 className="partner-heading mb-4 text-3xl font-semibold">{title}</h3> */}
      <div className="flex flex-col gap-[24px]">
        <div
          className="partner-heading"
          dangerouslySetInnerHTML={{
            __html: title,
          }}
        />
        <div
          className="partner-desc"
          dangerouslySetInnerHTML={{
            __html: desc,
          }}
        />
      </div>

      <div className="partner-children">{children}</div>
    </section>
  );
};
