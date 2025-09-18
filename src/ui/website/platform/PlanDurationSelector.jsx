import { useState } from "react";

const PlanDurationSelector = ({ options = [], value, onChange }) => {
  const [selected, setSelected] = useState(null);

  const handleSelect = (value) => {
    setSelected(value);
    if (onChange) onChange(value);
  };

  return (
    <div className="subscription-upgrade-options">
      {options.map((option) => (
        <label
          key={option.value}
          className={`plan-option 
            ${value === option.value ? "plan-option-active" : ""}
          `}
          onClick={() => handleSelect(option.value)}
        >
          <input
            type="radio"
            name="plan-duration"
            // defaultChecked={"half"}
            value={option.value}
            checked={value === option.value}
            onChange={() => onChange(option.value)}
            className="plan-radio"
          />
          <span className="plan-label">{option.label}</span>
        </label>
      ))}
    </div>
  );
};

export default PlanDurationSelector;
