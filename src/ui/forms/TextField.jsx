import React from "react";
import { Form } from "react-bootstrap";

const TextField = React.forwardRef(({ label, error, hint, ...props }, ref) => {
  console.log(hint);

  return (
    <div className="input-field">
      {label && (
        <label htmlFor={props.id}>
          {label} <sapn className="hint">{hint}</sapn>
        </label>
      )}
      <Form.Control as={"textarea"} ref={ref} {...props} />
      {error && (
        <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
      )}
    </div>
  );
});

TextField.displayName = "TextField";

export default TextField;
