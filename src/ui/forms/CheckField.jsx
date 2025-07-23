import React from "react";

const CheckField = ({
  label,
  id,
  value,
  onChange,
  activeValue,
  inactiveValue,
  activeLabel = "نعم",
  inactiveLabel = "لا",
}) => {
  return (
    <div className="check_field">
      {label && (
        <label className="field-label" htmlFor={id}>
          {label}
        </label>
      )}
      <div className="yes-no-toggle">
        <button
          type="button"
          className={value === inactiveValue ? "toggle-btn active" : "toggle-btn"}
          onClick={() => onChange({ target: { value: inactiveValue } })}
        >
          {inactiveLabel}
        </button>
        <button
          type="button"
          className={value === activeValue ? "toggle-btn active" : "toggle-btn"}
          onClick={() => onChange({ target: { value: activeValue } })}
        >
          {activeLabel}
        </button>
      </div>
    </div>
  );
};

export default CheckField;
