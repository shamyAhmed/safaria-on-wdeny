import Image, { ImageProps } from "next/image";
import { FiImage } from "react-icons/fi";

interface MediaPlaceholderProps {
  /** The alt text the image would have carried — shown as the caption. */
  label: string;
  className?: string;
  iconClassName?: string;
  /** Drop the caption on tiles too small to read it. */
  showLabel?: boolean;
}

/**
 * Stands in for a CMS image that hasn't been uploaded yet. Deliberately *not* a
 * stock photo: a placeholder makes the missing content obvious to whoever
 * maintains the block, where a bundled default would quietly hide it.
 */
export const MediaPlaceholder = ({
  label,
  className = "",
  iconClassName = "text-2xl",
  showLabel = true,
}: MediaPlaceholderProps) => (
  <div
    role="img"
    aria-label={label}
    className={`flex h-full w-full flex-col items-center justify-center gap-2 bg-gray-100 p-3 text-gray-400 ${className}`}>
    <FiImage
      className={iconClassName}
      aria-hidden
    />
    {showLabel && label && (
      <span className="line-clamp-2 text-center text-xs font-medium">{label}</span>
    )}
  </div>
);

type CmsImageProps = Omit<ImageProps, "src" | "alt"> & {
  /** CMS media URL; blank or missing swaps in the placeholder. */
  src?: string | null;
  alt: string;
  placeholderClassName?: string;
  placeholderIconClassName?: string;
  showPlaceholderLabel?: boolean;
};

/**
 * `next/image` for CMS-supplied media, falling back to {@link MediaPlaceholder}
 * when the block carries no URL — which also keeps `next/image` from throwing
 * on an empty `src`.
 */
export const CmsImage = ({
  src,
  alt,
  placeholderClassName = "",
  placeholderIconClassName,
  showPlaceholderLabel = true,
  ...imageProps
}: CmsImageProps) => {
  if (!src?.trim()) {
    return (
      <MediaPlaceholder
        label={alt}
        // `fill` images are positioned by their container; match that so the
        // placeholder occupies exactly the same box.
        className={`${imageProps.fill ? "absolute inset-0" : ""} ${placeholderClassName}`}
        iconClassName={placeholderIconClassName}
        showLabel={showPlaceholderLabel}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      {...imageProps}
    />
  );
};
