
import { useRef, useState } from "react";
import { Button, Overlay, Popover } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import InputField from "../../forms/InputField";
import SelectField from "../../forms/SelectField";
import CustomButton from "../../CustomButton";

const isFilterActive = (value) => {
  if (!value) return false;

  // date range
  if (typeof value === "object") {
    return Object.values(value).some(
      (v) => v !== "" && v !== null && v !== undefined,
    );
  }

  // single value (text, select, number)
  return value !== "";
};

const TableColumnFilter = ({ value, onChange, config, label }) => {
  const { type = "select", options = [], mode } = config;
  const { t } = useTranslation();
  const targetRef = useRef(null);
  const [show, setShow] = useState(false);
  const [draft, setDraft] = useState(value);
  const active = isFilterActive(value);
  const close = () => setShow(false);

  const apply = () => {
    onChange(draft);
    close();
  };

  const reset = () => {
    const empty = mode === "range" ? { from: "", to: "" } : "";
    setDraft(empty);
    onChange(empty);
    close();
  };

  const handleDateChange = (key, v) => {
    setDraft((prev) => ({
      ...(prev || {}),
      [key]: v,
    }));
  };

  const renderInputs = () => {
    if (type === "date" && mode === "range") {
      return (
        <div className="d-flex gap-2">
          <InputField
            label={t("fromDate")}
            type="date"
            value={draft?.from || ""}
            onChange={(e) => handleDateChange("from", e.target.value)}
          />
          <InputField
            label={t("toDate")}
            type="date"
            value={draft?.to || ""}
            onChange={(e) => handleDateChange("to", e.target.value)}
          />
        </div>
      );
    }

    if (type === "select") {
      return (
        <SelectField
          label={label}
          options={options.map((o) => ({
            value: o.value,
            name: o.label,
          }))}
          value={draft || ""}
          onChange={(e) => setDraft(e.target.value)}
        />
      );
    }

    return (
      <InputField
        type={type}
        value={draft || ""}
        onChange={(e) => setDraft(e.target.value)}
      />
    );
  };

  return (
    <>
      <Button
        ref={targetRef}
        size="sm"
        className={`filter-button ${active ? "active" : ""}`}
        onClick={() => setShow((s) => !s)}
      >
        <i className="fa-solid fa-filter" />
      </Button>

      <Overlay
        target={targetRef.current}
        show={show}
        placement="bottom"
        rootClose
        onHide={close}
      >
        <Popover className="table-filter-popover">
          {/* HEADER */}
          <Popover.Header className="fw-bold">{t("filter")}</Popover.Header>

          {/* BODY */}
          <Popover.Body>
            <div className="form_ui">{renderInputs()}</div>
          </Popover.Body>

          {/* FOOTER */}
          <div className="d-flex justify-content-between px-3 pb-3">
            <CustomButton variant="light" onClick={reset}>
              {t("reset")}
            </CustomButton>

            <CustomButton onClick={apply}>{t("apply")}</CustomButton>
          </div>
        </Popover>
      </Overlay>
    </>
  );
};

export default TableColumnFilter;
