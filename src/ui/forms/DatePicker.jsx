import React from "react";
import { Form } from "react-bootstrap";

const DatePicker = React.forwardRef(
  ({ label, hint, beforeContent, afterContent, error, ...props }, ref) => {
    return (
      <div className="input-field">
        {label && (
          <label>
            {label} {hint && <span className="hint">{hint}</span>}
          </label>
        )}
        <div className="main-elements">
          {beforeContent && <h6 className="text-nowrap">{beforeContent}</h6>}

          <div className="d-flex flex-column gap-1 w-100">
            <Form.Control
              {...props}
              ref={ref}
              type="date"
              isInvalid={!!error}
            />
            {error && (
              <Form.Control.Feedback type="invalid">
                {error}
              </Form.Control.Feedback>
            )}
          </div>

          {afterContent && <h6>{afterContent}</h6>}
        </div>
      </div>
    );
  }
);

// ✅ Helpful for debugging and linting
DatePicker.displayName = "DatePicker";

export default DatePicker;
