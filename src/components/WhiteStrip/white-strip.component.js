import React from "react";
import "./white-strip.styles.scss";

const WhiteStrip = ({ children }) => {
  return (
    <>
      <div className="white-strip shadow-sm">{children}</div>
    </>
  );
};

export default WhiteStrip;
