import React from "react";
import { Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const SelectField = React.forwardRef(
  (
    {
      label,
      hint,
      options,
      labelHint,
      error,
      disableFiledValue,
      loading = false,
      disabled = false,
      children,
      ...props
    },
    ref,
  ) => {
    const { t } = useTranslation();
    return (
      <div className="input-field">
        {label && (
          <div className="d-flex align-items-center justify-content-between">
            {" "}
            <label htmlFor={props?.id}>{label}</label> {labelHint}
          </div>
        )}

        <Form.Select
          ref={ref}
          isInvalid={!!error}
          {...props}
          disabled={disabled || loading}
        >
          {loading ? (
            <option value="">{props.loadingText || t("loading")}</option>
          ) : (
            <>
              <option value="">{disableFiledValue || t("select")}</option>
              {options?.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.name}
                </option>
              ))}
            </>
          )}
        </Form.Select>

        {hint && <span className="hint">{hint}</span>}
        {children}
        {error && (
          <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
        )}
      </div>
    );
  },
);

SelectField.displayName = "SelectField";
export default SelectField;
