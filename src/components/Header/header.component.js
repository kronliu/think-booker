import React from "react";
import "./header.styles.scss";

const Header = ({ children }) => {
  return (
    <>
      <div className="header">{children}</div>
    </>
  );
};

export default Header;
