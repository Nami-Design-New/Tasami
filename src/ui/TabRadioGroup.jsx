import PropTypes from "prop-types";

const TabRadioGroup = ({ name, options, register }) => {
  return (
    <div className="tab-radio-group">
      {options.map(({ label, value, id }, index) => {
        const inputId = id || `${name}-${value}-${index}`;
        return (
          <div className="tab-radio-item" key={inputId}>
            <input
              type="radio"
              id={inputId}
              value={value}
              {...register(name)}
            />
            <label htmlFor={inputId}>{label}</label>
          </div>
        );
      })}
    </div>
  );
};

TabRadioGroup.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.node.isRequired,
      value: PropTypes.string.isRequired,
      id: PropTypes.string, // optional
    })
  ).isRequired,
  register: PropTypes.func.isRequired,
};

export default TabRadioGroup;
