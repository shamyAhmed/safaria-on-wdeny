import { AfterConfirmationReward_section } from "./sections/AfterConfirmationReward_section";
import { ConfirmationRewardBanner_section } from "./sections/ConfirmationRewardBanner_section";
import { RewardDetails_section } from "./sections/RewardDetails_section";
import style from "./styles/confirmationReward.module.scss";

export const ConfirmationRewardComponent = () => {
  return (
    <div className={style.confirmationReward}>
      <ConfirmationRewardBanner_section />
      <RewardDetails_section />
      <AfterConfirmationReward_section />
    </div>
  );
};
