import { AvailableRewards_section } from "./sections/AvailableRewards_section";
import { AvailableRewardsBanner_section } from "./sections/AvailableRewardsBanner_section";
import { AvailableRewardsMorePoints_section } from "./sections/AvailableRewardsMorePoints_section";
import { AvailableRewardsTearms_section } from "./sections/AvailableRewardsTearms_section";
import style from "./styles/AvailableRewards.module.scss";

export const AvailableRewardsComponent = () => {
  return (
    <div className={style.availableReward}>
      <AvailableRewardsBanner_section />
      <AvailableRewards_section />
      <AvailableRewardsTearms_section />
      <AvailableRewardsMorePoints_section />
    </div>
  );
};
