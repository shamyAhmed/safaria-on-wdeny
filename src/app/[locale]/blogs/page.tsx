import { BlogsComponent } from "@/components/blogs/BlogsComponent";
import { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata({ locale, path: "/blogs", page: "blogs" });
}

const BlogsPage: React.FC = (): JSX.Element => {
  return <BlogsComponent />;
};

export default BlogsPage;
