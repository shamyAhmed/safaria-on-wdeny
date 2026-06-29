import { BlogsComponent } from "@/components/blogs/BlogsComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "المدونة",
};

const BlogsPage: React.FC = (): JSX.Element => {
  return <BlogsComponent />;
};

export default BlogsPage;
