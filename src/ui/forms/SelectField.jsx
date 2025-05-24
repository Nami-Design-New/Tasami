import React from "react";
import { Form } from "react-bootstrap";

const SelectField = React.forwardRef(
  ({ label, hint, options, error, ...props }, ref) => {
    console.log(error);

    return (
      <div className="input-field">
        {label && (
          <label htmlFor={props?.id}>
            {label} {hint && <span className="hint">{hint}</span>}
          </label>
        )}

        <Form.Select ref={ref} isInvalid={!!error} {...props}>
          <option value="" disabled>
            Select
          </option>
          {options?.map((option, index) => (
            <option key={index} value={option.value}>
              {option.name}
            </option>
          ))}
        </Form.Select>

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
