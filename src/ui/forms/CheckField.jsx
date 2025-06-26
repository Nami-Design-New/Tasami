import React from "react";

const CheckField = ({
  label,
 id,
 value,
 onChange,
 activeValue,
 inactiveValue,
 activeLabel = "مفعل",
 inactiveLabel = "معطل",
}) => {
  return (
    <div className="check_field">
      {label && <label className="field-label" htmlFor={id}>{label}</label>}
      <div className="buttons-group">
        <button
          type="button"
          className={`toggle-btn ${value === activeValue ? "active" : ""}`}
          onClick={() => onChange({ target: { value: activeValue } })}
        >
          {activeLabel}
        </button>
        <button
          type="button"
          className={`toggle-btn ${value === inactiveValue ? "active" : ""}`}
          onClick={() => onChange({ target: { value: inactiveValue } })}
        >
          {inactiveLabel}
        </button>
      </div>
    </div>
  );
};

export default CheckField;
