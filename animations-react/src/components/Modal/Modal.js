import React from "react";

import "./Modal.css";

const modal = ({ isShow, closed }) => {
  const cssClasses = `Modal ${isShow ? "ModalOpen" : "ModalClosed"}`;
  return (
    <div className={cssClasses}>
      <h1>A Modal</h1>
      <button className="Button" onClick={closed}>
        Dismiss
      </button>
    </div>
  );
};

export default modal;
