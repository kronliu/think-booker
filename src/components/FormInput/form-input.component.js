import React from "react";
import "./form-input.styles.scss";

const FormInput = ({
  onChange,
  onClick,
  value,
  type,
  label,
  invalidMessage,
}) => {
  return (
    <>
      <div className="group">
        <input
          className="control"
          onChange={onChange}
          onClick={onClick}
          value={value}
          type={type}
        />
        {label ? (
          <label className={`${value.length ? "shrink" : ""} form-input-label`}>
            {label}
          </label>
        ) : null}
        {invalidMessage ? (
          <span className="invalid">{invalidMessage}</span>
        ) : null}
      </div>
    </>
  );
};

export default FormInput;
