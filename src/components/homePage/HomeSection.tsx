import { ReactNode } from "react";

interface HomeSectionProps {
  title: string;
  description?: string;
  children: ReactNode;
  /** className for the outer <section> element — include bg, py, etc. */
  className?: string;
  /** extra className on the header block — use for text alignment, max-w, etc. */
  headerClassName?: string;
  /** extra className on the description <p> */
  descriptionClassName?: string;
  /** use white text when the section has a dark background */
  light?: boolean;
}

export const HomeSection = ({
  title,
  description,
  children,
  className = "py-16",
  headerClassName = "",
  descriptionClassName = "",
  light = false,
}: HomeSectionProps) => (
  <section className={className}>
    <div className="container">
      <div className={`mb-10 ${headerClassName}`}>
        <h2 className={`text-3xl md:text-4xl font-bold mb-3 ${light ? "text-white" : "text-primary"}`}>
          {title}
        </h2>
        {description && (
          <p
            className={`text-base md:text-lg leading-relaxed ${light ? "text-white/90" : "text-gray-700"} ${descriptionClassName}`}
          >
            {description}
          </p>
        )}
      </div>
    </div>
    {children}
  </section>
);
