import React from "react";

import "./Backdrop.css";

const backdrop = ({ isShow, closed }) => {
  const cssClasses = `Backdrop ${isShow ? "BackdropOpen" : "BackdropClosed"}`;
  return <div className={cssClasses} onClick={closed}></div>;
};

export default backdrop;
