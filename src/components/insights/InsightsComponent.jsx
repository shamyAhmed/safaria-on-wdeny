import {
  getPublishedInsightsData,
  getFeaturedInsightsData,
  getlastInsightData,
} from "@/apiCalls/products/getAllProducts";
import { BrowseMoreArticlesSection } from "./sections/BrowseMoreArticlesSection";
import { FeaturedArticlesSection } from "./sections/FeaturedArticlesSection";
import { InsightsHeroSection } from "./sections/InsightsHeroSection";
import style from "./styles/insights.module.scss";

export const InsightsComponent = async ({ searchParams }) => {
  const currentPage = Number(searchParams?.page || 1);

  const publishedPosts = await getPublishedInsightsData(currentPage);
  const featuredPosts = await getFeaturedInsightsData();
  const data = await getlastInsightData();

  return (
    <div className={style.insights}>
      <InsightsHeroSection lastInsight={data} />
      <FeaturedArticlesSection articles={featuredPosts?.data} />
      <BrowseMoreArticlesSection
        articles={publishedPosts.data}
        total={publishedPosts.total}
        currentPage={currentPage}
      />
    </div>
  );
};
