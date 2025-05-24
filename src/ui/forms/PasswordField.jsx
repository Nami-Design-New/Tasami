import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { useSelector } from "react-redux";

const PasswordField = React.forwardRef(({ label, error, ...props }, ref) => {
  const [showPass, setShowPass] = useState(false);
  const lang = useSelector((state) => state.language.lang);

  const handleInputType = (e) => {
    e.preventDefault();
    setShowPass((prev) => !prev);
  };

  return (
    <div className="input-field">
      {label && <label htmlFor={props?.id}>{label}</label>}

      <div className={`pass-group ${lang === "ar" ? "ar" : "en"}`}>
        <Form.Control
          ref={ref} // 🔑 forward the ref here
          {...props}
          type={showPass ? "text" : "password"}
          isInvalid={!!error}
        />

        <div className="show-pass" onClick={handleInputType}>
          <i
            className={`fa-regular ${!showPass ? "fa-eye-slash" : "fa-eye"}`}
          />
        </div>
      </div>

      {error && (
        <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
      )}
    </div>
  );
});

// ✅ Add displayName for better debugging
PasswordField.displayName = "PasswordField";

export default PasswordField;
