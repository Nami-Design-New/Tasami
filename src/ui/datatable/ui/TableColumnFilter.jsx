import { Button, Form, OverlayTrigger, Popover } from "react-bootstrap";
import InputField from "../../forms/InputField";
import { useTranslation } from "react-i18next";


const TableColumnFilter = ({ value, onChange, config }) => {
  const { type = "select", options = [], mode } = config;
  const {t} = useTranslation()

  const handleDateChange = (key, newValue) => {
    onChange({
      ...(value || {}),
      [key]: newValue,
    });
  };

  const renderInput = () => {
    // DATE RANGE
    if (type === "date" && mode === "range") {
      return (
        <div className="d-flex align-items-end gap-1 form_ui">
          <InputField
          label={t("fromDate")}
            type="date"
            value={value?.from || ""}
            onChange={(e) => handleDateChange("from", e.target.value)}
          />
          <InputField
          label={t("fromDate")}
            type="date"
            value={value?.to || ""}
            onChange={(e) => handleDateChange("to", e.target.value)}
          />
        </div>
      );
    }

    // SELECT
    if (type === "select") {
      return (
        <Form.Select
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="">-- Select --</option>
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </Form.Select>
      );
    }

    //  DEFAULT (text, single date, etc.)
    return (
      <InputField
        type={type}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
      />
    );
  };

  const handleReset = () => {
    onChange(mode === "range" ? { from: "", to: "" } : "");
  };

  return (
    <OverlayTrigger
      trigger="click"
      placement="bottom"
      rootClose
      overlay={
        <Popover>
          <Popover.Body className="d-flex gap-1 align-items-center">
            {renderInput()}
            <Button size="sm" variant="light" onClick={handleReset}>
              <i className="fa-solid fa-arrow-rotate-right"></i>{" "}
            </Button>
          </Popover.Body>
        </Popover>
      }
    >
      <Button size="sm" variant="light">
        <i className="fa-solid fa-filter" />
      </Button>
    </OverlayTrigger>
  );
};

export default TableColumnFilter;
