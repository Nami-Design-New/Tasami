import React from "react";
import { Form } from "react-bootstrap";

const TextField = React.forwardRef(({ label, hint, ...props }, ref) => {
  return (
    <div className="input-field">
      {label && (
        <label htmlFor={props.id}>
          {label} {hint}
        </label>
      )}
      <Form.Control as={"textarea"} ref={ref} {...props} />
    </div>
  );
});

TextField.displayName = "TextField";

export default TextField;
