import { LoyalityProgramBanner_section } from "./sections/LoyalityProgramBanner_section";
import { LoyalityProgramFeatures_section } from "./sections/LoyalityProgramFeatures_section";
import { LoyalityProgramHowWorks_section } from "./sections/LoyalityProgramHowWorks_section";
import { LoyalityProgramNotMember_section } from "./sections/LoyalityProgramNotMember_section";

import style from "./styles/loyalityProgram.module.scss";

export const LoyalityProgramComponent = () => {
  return (
    <div className={style.loyalityProgram}>
      <LoyalityProgramBanner_section />
      <LoyalityProgramHowWorks_section />
      <LoyalityProgramFeatures_section />
      <LoyalityProgramNotMember_section />
    </div>
  );
};
