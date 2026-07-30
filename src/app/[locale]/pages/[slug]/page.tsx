import axiosInstance from "@/lib/axios";
import { PageContent } from "@/app/[locale]/_types/Page";
import { ApiResponse } from "@/app/[locale]/_types/Api";
import { PageBannerSection } from "@/components/tools/sections/PageBannerSection";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { pageMetadata, toMetaDescription } from "@/lib/seo";

interface PageProps {
  params: Promise<{ slug: string; locale: string }>;
}

const fetchPageContent = async (slug: string): Promise<PageContent | null> => {
  try {
    const response = await axiosInstance.get<ApiResponse<PageContent>>(`/pages/${slug}`);
    return response.data.data;
  } catch {
    return null;
  }
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const page = await fetchPageContent(slug);

  if (!page) return { robots: { index: false, follow: false } };

  return pageMetadata({
    locale,
    path: `/pages/${page.slug}`,
    title: page.title,
    description: toMetaDescription(page.content),
  });
}

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
