import React from "react";
import style from "./progressbar.module.scss";

const ProgressBar = ({ width }: { width: number }) => {
  return (
    <div className={style.progress_bar}>
      <div style={{ width: width + "%" }} className={style.indicator}></div>
    </div>
  );
};

export default ProgressBar;
