import { notFound } from "next/navigation";
import { Metadata } from "next";
import { SingleBlogComponent } from "@/components/blogs/single-blog/SingleBlogComponent";
import { BlogPostDetail } from "@/app/[locale]/_hooks/useGetBlogs";
import { ApiResponse } from "@/app/[locale]/_types/Api";
import apiRoutes from "@/lib/apiRoutes";
import { SEO_COPY, normalizeLocale, pageMetadata, toMetaDescription } from "@/lib/seo";

interface PageProps {
  params: Promise<{ slug: string; locale: string }>;
}

async function getBlogBySlug(slug: string, locale: string): Promise<BlogPostDetail | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}${apiRoutes.postBySlug(slug)}`,
      {
        headers: { "Accept-Language": locale },
        next: { revalidate: 60 },
      }
    );
    if (!res.ok) return null;
    const json: ApiResponse<BlogPostDetail> = await res.json();
    return json.data;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const blog = await getBlogBySlug(slug, locale);
  const fallback = SEO_COPY.blogs[normalizeLocale(locale)];

  return pageMetadata({
    locale,
    path: `/blogs/${slug}`,
    title: blog?.seo_title ?? blog?.title ?? fallback.title,
    description:
      toMetaDescription(blog?.seo_description) ??
      toMetaDescription(blog?.description) ??
      fallback.description,
    images: blog?.image?.url ? [blog.image.url] : undefined,
  });
}

const SingleBlogPage = async ({ params }: PageProps) => {
  const { slug, locale } = await params;
  const blog = await getBlogBySlug(slug, locale);

  if (!blog) notFound();

  return <SingleBlogComponent blog={blog} />;
};

export default SingleBlogPage;
