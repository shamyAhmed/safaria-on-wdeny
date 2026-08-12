import axiosInstance from "@/lib/axios";
import { SiteBlock } from "@/app/[locale]/_types/SiteBlocks";

/**
 * The API serialises the block list as a JSON object keyed by position
 * ("0", "1", …) rather than an array, so normalise it before sorting.
 */
const toBlockArray = (data: unknown): SiteBlock[] => {
  if (Array.isArray(data)) return data as SiteBlock[];
  if (data && typeof data === "object") return Object.values(data) as SiteBlock[];
  return [];
};

/**
 * The home page's content, in the order the CMS wants it rendered.
 * Returns an empty list on failure — the page then renders its hero only
 * rather than erroring out.
 */
export const getSiteBlocks = async (): Promise<SiteBlock[]> => {
  try {
    const response = await axiosInstance.get("/site/blocks");
    return toBlockArray(response.data?.data)
      .filter((block) => block?.type)
      .sort((a, b) => a.sort - b.sort);
  } catch (error) {
    console.error("Failed to load site blocks:", error);
    return [];
  }
};
