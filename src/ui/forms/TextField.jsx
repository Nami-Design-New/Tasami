import React from "react";
import { Form } from "react-bootstrap";

const TextField = React.forwardRef(
  (
    {
      label,
      error,
      hint,
      maxLength = 500,
      showCounter = true,
      counterValue,
      onChange,
      onFocus,
      value,
      defaultValue,
      ...props
    },
    ref,
  ) => {
    const textareaRef = React.useRef(null);
    const getTextLength = React.useCallback(
      (text) => String(text ?? "").length,
      [],
    );
    const [currentLength, setCurrentLength] = React.useState(() =>
      getTextLength(counterValue ?? value ?? defaultValue),
    );
    const resolvedMaxLength = maxLength ?? undefined;
    const remainingCharacters =
      resolvedMaxLength === undefined
        ? null
        : Math.max(resolvedMaxLength - currentLength, 0);
    const usedPercentage =
      resolvedMaxLength === undefined || resolvedMaxLength === 0
        ? 0
        : Math.min((currentLength / resolvedMaxLength) * 100, 100);
    const counterStatus =
      remainingCharacters === 0
        ? "is-full"
        : usedPercentage >= 90
          ? "is-near-limit"
          : "";

    const setRefs = React.useCallback(
      (node) => {
        textareaRef.current = node;

        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      },
      [ref],
    );

    React.useEffect(() => {
      if (counterValue !== undefined) {
        setCurrentLength(getTextLength(counterValue));
        return;
      }

      if (value !== undefined) {
        setCurrentLength(getTextLength(value));
        return;
      }

      if (defaultValue !== undefined) {
        setCurrentLength(getTextLength(defaultValue));
      }
    }, [counterValue, defaultValue, getTextLength, value]);

    const handleChange = (event) => {
      setCurrentLength(event.target.value.length);
      onChange?.(event);
    };

    const handleFocus = (event) => {
      setCurrentLength(event.target.value.length);
      onFocus?.(event);
    };

    return (
      <div className="input-field">
        {label && (
          <label htmlFor={props.id}>
            {label} <span className="hint">{hint}</span>
          </label>
        )}
        <Form.Control
          as={"textarea"}
          ref={setRefs}
          maxLength={resolvedMaxLength}
          value={value}
          defaultValue={defaultValue}
          onChange={handleChange}
          onFocus={handleFocus}
          {...props}
        />
        {showCounter && remainingCharacters !== null && (
          <div
            className={`text-field-counter ${counterStatus}`}
            style={{ "--counter-progress": `${usedPercentage}%` }}
          >
            {/* <span className="text-field-counter__bar" aria-hidden="true" /> */}
            <span className="text-field-counter__value" aria-live="polite">
              {remainingCharacters}/{resolvedMaxLength}
            </span>
          </div>
        )}
        {error && (
          <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
        )}
      </div>
    );
  },
);

TextField.displayName = "TextField";

export default TextField;
