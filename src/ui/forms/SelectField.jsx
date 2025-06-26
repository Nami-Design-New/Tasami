import React from "react";
import { Form } from "react-bootstrap";

const SelectField = React.forwardRef(
  ({ label, hint, options, error, disableFiledValue, ...props }, ref) => {
    return (
      <div className="input-field">
        {label && (
          <label htmlFor={props?.id}>
            {label}
          </label>
        )}

        <Form.Select ref={ref} isInvalid={!!error} {...props}>
          <option value={""} selected>
            {disableFiledValue || "Select"}
          </option>
          {options?.map((option, index) => (
            <option key={index} value={option.value}>
              {option.name}
            </option>
          ))}
        </Form.Select>
 {hint && <span className="hint">{hint}</span>}
        {error && (
          <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
        )}
      </div>
    );
  }
);

// ✅ Set a display name for better debugging
SelectField.displayName = "SelectField";

export default SelectField;
