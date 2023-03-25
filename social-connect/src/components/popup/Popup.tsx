import React from "react";
import style from "./popup.module.scss";

const Popup = ({ children, isOpen }: any) => {
  return (
    <div
      className={`${style.popup_container} ${isOpen ? style.active_blur : ""}`}
    >
      {children}
    </div>
  );
};

export default Popup;
