import { Form } from "react-bootstrap";

const CustomInputWithUnit = ({ label, id, units, error, register }) => {
  return (
    <div className="input-field">
      <label htmlFor={id}>{label}</label>
      <div className="time-units">
        <input min="0" type="number" name={id} id={id} {...register(id)} />
        <select
          className="units"
          name={`${id}_unit`}
          id={`${id}_unit`}
          {...register(`${id}_unit`)}
        >
          {units.map((unit, index) => (
            <option key={index} value={unit}>
              {unit}
            </option>
          ))}
        </select>
      </div>
      {error && (
        <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
      )}
    </div>
  );
};

export default CustomInputWithUnit;
