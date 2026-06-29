import axiosInstance from "@/lib/axios";
import { PageContent } from "@/app/[locale]/_types/Page";
import { ApiResponse } from "@/app/[locale]/_types/Api";
import { PageBannerSection } from "@/components/tools/sections/PageBannerSection";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const fetchPageContent = async (slug: string): Promise<PageContent | null> => {
  try {
    const response = await axiosInstance.get<ApiResponse<PageContent>>(`/pages/${slug}`);
    return response.data.data;
  } catch {
    return null;
  }
};

const DynamicPage = async ({ params }: PageProps) => {
  const slug = (await params).slug
  const page = await fetchPageContent(slug);

  if (!page) {
    notFound();
  }

  return (
    <div>
      <PageBannerSection
        title={page.title}
        currentPage={page.title}
        currentLink={`/pages/${page.slug}`}
      />

      <div
        className="container min-h-[50vh] py-12"
        dangerouslySetInnerHTML={{ __html: page.content }}
      />
    </div>
  );
};

export default DynamicPage;
