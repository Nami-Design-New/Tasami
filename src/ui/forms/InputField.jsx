import React from "react";
import { Form } from "react-bootstrap";

const InputField = React.forwardRef(({ label, hint, error, ...props }, ref) => {
  return (
    <div className="input-field">
      {label && (
        <label htmlFor={props?.id}>
          {label} {hint && <span className="hint">{hint}</span>}
        </label>
      )}

      <Form.Control ref={ref} isInvalid={!!error} {...props} />

      {error && (
        <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
      )}
    </div>
  );
});

InputField.displayName = "InputField";

export default InputField;
