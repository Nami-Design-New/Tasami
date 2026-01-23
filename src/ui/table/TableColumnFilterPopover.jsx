import { useEffect, useState } from "react";
import { Button, Form, OverlayTrigger, Popover } from "react-bootstrap";

const TableColumnFilterPopover = ({
  columnId,
  value,
  onChange,
  filterConfig,
}) => {
  const { type = "select", options = [] } = filterConfig;

  const [selected, setSelected] = useState(value || "");

  useEffect(() => {
    setSelected(value || "");
  }, [value]);

  const applyFilter = (newValue) => {
    setSelected(newValue);

    onChange((prev) => {
      const without = prev.filter((f) => f.id !== columnId);
      return newValue
        ? [...without, { id: columnId, value: newValue }]
        : without;
    });
  };

  const handleReset = () => {
    console.log("reset");

    applyFilter("");
  };
  const renderInput = () => {
    switch (type) {
      case "select":
        return (
          <Form.Select
            value={selected}
            onChange={(e) => applyFilter(e.target.value)}
          >
            <option value="">-- Select --</option>
            {options.map((opt) => (
              <option key={opt?.id} value={opt?.value}>
                {opt?.label}
              </option>
            ))}
          </Form.Select>
        );

      case "text":
        return (
          <Form.Control
            type="text"
            value={selected}
            onChange={(e) => applyFilter(e.target.value)}
            placeholder="Enter text..."
          />
        );
      case "date":
        if (mode === "range") {
          return (
            <div className="d-flex gap-2">
              <Form.Control
                type="date"
                value={dateRange.from}
                onChange={(e) => handleDateChange("from", e.target.value)}
              />
              <Form.Control
                type="date"
                value={dateRange.to}
                onChange={(e) => handleDateChange("to", e.target.value)}
              />
            </div>
          );
        }

      default:
        return null;
    }
  };

  const popover = (
    <Popover id={`popover-${columnId}`}>
      <Popover.Body className="d-flex align-items-center gap-1">
        {renderInput()}
        <Button variant="light" size="sm" onClick={handleReset}>
          <i className="fa-solid fa-rotate-left"></i>
        </Button>
      </Popover.Body>
    </Popover>
  );

  return (
    <OverlayTrigger
      trigger="click"
      placement="bottom"
      overlay={popover}
      rootClose
    >
      <Button variant="light" size="sm">
        <i className="fa-solid fa-filter"></i>
      </Button>
    </OverlayTrigger>
  );
};

export default TableColumnFilterPopover;
