import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import "./outside-alerter.styles.scss";

const OutsideAlerter = ({ children, handleClose }) => {
  const [wrapperRef, setWrapperRef] = useState(null);

  const handleClickOutside = (event) => {
    if (wrapperRef && !wrapperRef.contains(event.target)) {
      handleClose();
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
  });

  return (
    <>
      <div ref={(node) => setWrapperRef(node)}>{children}</div>
    </>
  );
};

export default OutsideAlerter;

OutsideAlerter.propTypes = {
  children: PropTypes.element.isRequired,
};
