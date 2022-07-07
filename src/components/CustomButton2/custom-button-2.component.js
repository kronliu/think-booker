import React from "react";

import "./custom-button-2.styles.scss";

const CustomButton = ({ children, onClick }) => {
  return (
    <>
      <button className="custom-button-2" onClick={onClick}>
        {children}
      </button>
    </>
  );
};

export default CustomButton;
