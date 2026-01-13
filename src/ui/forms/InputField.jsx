import React from "react";
import { Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const InputField = React.forwardRef(
  ({ label, hint, error, className, icon = null, ...props }, ref) => {
    const { i18n } = useTranslation();
    const isRTL = i18n.dir() === "rtl";

    return (
      <div className={`input-field ${className ? className : ""}`}>
        {label && (
          <label htmlFor={props?.id}>
            {label} {hint && <span className="hint">{hint}</span>}
          </label>
        )}

        <Form.Control
          ref={ref}
          isInvalid={!!error}
          {...props}
          style={{
            backgroundImage: icon ? `url("${icon}")` : undefined,
            backgroundRepeat: "no-repeat",
            backgroundPosition: isRTL
              ? "left 10px center"
              : "right 10px center",
            paddingRight: !isRTL && icon ? "2rem" : undefined,
            paddingLeft: isRTL && icon ? "2rem" : undefined,
          }}
        />

        {error && (
          <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
        )}
      </div>
    );
  }
);

InputField.displayName = "InputField";

export default InputField;
