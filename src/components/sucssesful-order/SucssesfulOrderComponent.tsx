import React from "react";
import { RecirvedSucsses_section } from "./sections/RecirvedSucsses_section";
import { OrderDetails_section } from "./sections/OrderDetails_section";
import { WhatsNext_section } from "./sections/WhatsNext_section";

import style from "./styles/sucssesfulOrder.module.scss";

export const SucssesfulOrderComponent = () => {
  return (
    <div className={style.sucssesfulOrder}>
      <div className="mx-auto max-w-[600px] py-20">
        <RecirvedSucsses_section />
        <OrderDetails_section />
        <WhatsNext_section />
      </div>
    </div>
  );
};
