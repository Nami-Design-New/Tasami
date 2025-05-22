import { Form } from "react-bootstrap";
import InputField from "./InputField";

const CancellationPolicy = ({
  policies = [],
  onAdd,
  onRemove,
  onChange,
  errors,
}) => {
  const getErrorMessage = (error) => {
    if (typeof error === "string") return error;
    if (error?.message) return error.message;
    return "";
  };

  const handleTimeChange = (index, field, value, type) => {
    onChange(index, field, value);

    if (field === "cancel_before" || field === "type") {
      if (index < policies.length - 1) {
        onChange(index + 1, "cancel_before", value);
        onChange(index + 1, "type", type);
      }
    }

    if (field === "cancel_before_end" || field === "type_end") {
      if (index < policies.length - 1) {
        onChange(index + 1, "cancel_before", value);
        onChange(index + 1, "type", type);
      }
    }
  };

  return (
    <div className="col-12 p-2">
      <div className="input-field policy_form">
        <div className="header">
          <label>Cancellation Policy</label>

          <button
            type="button"
            onClick={onAdd}
            disabled={policies.length >= 5}
            className="add-policy-btn"
            title={
              policies.length >= 5
                ? "Maximum 5 policies allowed"
                : "Add new policy"
            }
          >
            <img src="/sys-icons/add.svg" alt="add" />
          </button>
        </div>

        {policies?.map((policy, index) => (
          <div key={index} className="col-12 p-0 pt-2 pb-2 policy_cancel">
            <div className="policyRow">
              {/* cancel before or between  */}
              <div className="input-field">
                <label htmlFor={`cancel_before_${index}`}>
                  {index === 0 ? "If cancel less than" : "If cancel between"}
                </label>
                <div className="time-units">
                  <InputField
                    type="number"
                    min="0"
                    placeholder="00"
                    value={policy.cancel_before}
                    onChange={(e) =>
                      handleTimeChange(
                        index,
                        "cancel_before",
                        e.target.value,
                        policy.type
                      )
                    }
                    name={`cancel_before_${index}`}
                    id={`cancel_before_${index}`}
                    disabled={index > 0}
                  />
                  <select
                    className="units"
                    value={policy.type}
                    onChange={(e) =>
                      handleTimeChange(index, "type", e.target.value)
                    }
                    name={`units_${index}`}
                    id={`units_${index}`}
                    disabled={index > 0}
                  >
                    {["minutes", "hours", "days", "weeks", "months"].map(
                      (unit, idx) => (
                        <option key={idx} value={unit}>
                          {unit}
                        </option>
                      )
                    )}
                  </select>
                </div>
                {errors?.[index]?.cancel_before && (
                  <Form.Control.Feedback type="invalid">
                    {getErrorMessage(errors[index].cancel_before)}
                  </Form.Control.Feedback>
                )}
              </div>

              {/* cancel before end */}
              {index > 0 && (
                <div className="input-field">
                  <label htmlFor={`cancel_before_end_${index}`}>And</label>
                  <div className="time-units">
                    <input
                      type="number"
                      placeholder="00"
                      value={policy.cancel_before_end}
                      onChange={(e) =>
                        handleTimeChange(
                          index,
                          "cancel_before_end",
                          e.target.value,
                          policy.type_end
                        )
                      }
                      name={`cancel_before_end_${index}`}
                      id={`cancel_before_end_${index}`}
                      className={
                        errors?.[index]?.cancel_before_end ? "is-invalid" : ""
                      }
                    />
                    <select
                      className="units"
                      value={policy.type_end}
                      onChange={(e) =>
                        handleTimeChange(index, "type_end", e.target.value)
                      }
                      name={`units_end_${index}`}
                      id={`units_end_${index}`}
                    >
                      {["minutes", "hours", "days", "weeks", "months"].map(
                        (unit, idx) => (
                          <option key={idx} value={unit}>
                            {unit}
                          </option>
                        )
                      )}
                    </select>
                  </div>
                  {errors?.[index]?.cancel_before_end && (
                    <Form.Control.Feedback type="invalid">
                      {getErrorMessage(errors[index].cancel_before_end)}
                    </Form.Control.Feedback>
                  )}
                </div>
              )}

              {/* refund */}
              <div>
                <label htmlFor={`firstDaysRefund_${index}`}>Refund is</label>
                <div className="d-flex align-items-center gap-2">
                  <input
                    type="number"
                    value={policy.percentage}
                    onChange={(e) =>
                      onChange(index, "percentage", e.target.value)
                    }
                    id={`firstDaysRefund_${index}`}
                    placeholder="00"
                    className={errors?.[index]?.percentage ? "is-invalid" : ""}
                  />
                  <span>%</span>
                </div>
                {errors?.[index]?.percentage && (
                  <Form.Control.Feedback type="invalid">
                    {getErrorMessage(errors[index].percentage)}
                  </Form.Control.Feedback>
                )}
              </div>
            </div>

            <button
              className="trash_btn"
              type="button"
              onClick={() => onRemove(index)}
              disabled={policies?.length <= 1}
              title={
                policies?.length <= 1
                  ? "At least one policy required"
                  : "Remove policy"
              }
            >
              <img src="/sys-icons/delete.svg" alt="trash" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CancellationPolicy;
