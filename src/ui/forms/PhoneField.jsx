import { Form } from "react-bootstrap";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export default function PhoneField({ label, name, error, onChange, ...props }) {
  return (
    <div className="form_field">
      {label && <label htmlFor={props?.id}>{label}</label>}
      <PhoneInput
        {...props}
        country={"sa"}
        enableSearch={true}
        onChange={(phone) => {
          onChange({
            target: {
              name,
              value: phone,
            },
          });
        }}
      />
      {error && (
        <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
      )}
    </div>
  );
}
