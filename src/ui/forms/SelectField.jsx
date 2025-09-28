import React from "react";
import { Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const SelectField = React.forwardRef(
  (
    {
      label,
      hint,
      options,
      error,
      disableFiledValue,
      loading = false,
      ...props
    },
    ref
  ) => {
    const { t } = useTranslation();
    return (
      <div className="input-field">
        {label && <label htmlFor={props?.id}>{label}</label>}

        <Form.Select
          ref={ref}
          isInvalid={!!error}
          {...props}
          disabled={loading}
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
        {error && (
          <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
        )}
      </div>
    );
  }
);

SelectField.displayName = "SelectField";
export default SelectField;
