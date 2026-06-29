// import { ConclusionSection } from "./sections/single-insights/ConclusionSection";
// import { PerfectFitSection } from "./sections/single-insights/PerfectFitSection";
import { SingleInsightHeroSection } from "./sections/single-insights/SingleInsightHeroSection";
// import { WhatIsSection } from "./sections/single-insights/WhatIsSection";
// import { WhatTheFutureSection } from "./sections/single-insights/WhatTheFutureSection";
// import { WhyTheStudioSection } from "./sections/single-insights/WhyTheStudioSection";
import style from "./styles/singleInsight.module.scss";
import { SingleInsightConten_section } from "./sections/single-insights/SingleInsightConten_section";

export const SingleInsightComponent = ({ insight }: { insight: any }) => {
  return (
    <div className={style.singleInsight}>
      <SingleInsightHeroSection insight={insight} />
      <SingleInsightConten_section insight={insight} />
      {/* <WhatIsSection />
      <WhyTheStudioSection />
      <PerfectFitSection />
      <WhatTheFutureSection />
      <ConclusionSection /> */}
    </div>
  );
};
