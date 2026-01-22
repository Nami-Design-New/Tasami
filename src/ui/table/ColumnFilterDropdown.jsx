import { useEffect, useRef, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";

/**
 * Column Filter Dropdown Component
 * Renders a filter dropdown in table column headers
 */
const ColumnFilterDropdown = ({
  column,
  filterOptions = [],
  isLoading = false,
  onFilterChange,
  currentValue = null,
  placeholder = "All",
}) => {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  const dropdownRef = useRef(null);

  const handleSelect = (value) => {
    if (onFilterChange) {
      // If clicking the same value, clear the filter
      const newValue = currentValue === value ? null : value;
      onFilterChange(column.id, newValue);
    }
    setShow(false);
  };

  const handleClear = (e) => {
    e.stopPropagation();
    if (onFilterChange) {
      onFilterChange(column.id, null);
    }
  };

  // Get display text for current filter
  const getDisplayText = () => {
    if (!currentValue) return placeholder;
    const option = filterOptions.find((opt) => opt.value === currentValue);
    return option ? option.label : currentValue;
  };

  const hasActiveFilter = currentValue !== null && currentValue !== undefined;

  return (
    <div
      className="column-filter-dropdown"
      onClick={(e) => e.stopPropagation()}
    >
      <Dropdown show={show} onToggle={setShow} ref={dropdownRef}>
        <Dropdown.Toggle
          variant="link"
          size="sm"
          className={`p-0 border-0 column-filter-toggle ${hasActiveFilter ? "active" : ""}`}
          disabled={isLoading || filterOptions.length === 0}
        >
          <i
            className={`fa-solid ${hasActiveFilter ? "fa-filter" : "fa-filter"} ${hasActiveFilter ? "text-primary" : "text-muted"}`}
          ></i>
          {hasActiveFilter && (
            <i
              className="fa-solid fa-times-circle text-danger ms-1"
              onClick={handleClear}
              style={{ cursor: "pointer", fontSize: "0.75rem" }}
            ></i>
          )}
        </Dropdown.Toggle>

        <Dropdown.Menu align="end" className="column-filter-menu">
          <Dropdown.Header>{t("selectFilter")}</Dropdown.Header>

          {filterOptions.length === 0 ? (
            <Dropdown.Item disabled>
              <small className="text-muted">{t("noOptionsAvailable")}</small>
            </Dropdown.Item>
          ) : (
            <>
              <Dropdown.Item
                active={!hasActiveFilter}
                onClick={() => handleSelect(null)}
              >
                {placeholder}
              </Dropdown.Item>
              <Dropdown.Divider />
              {filterOptions.map((option) => (
                <Dropdown.Item
                  key={option.value}
                  active={currentValue === option.value}
                  onClick={() => handleSelect(option.value)}
                >
                  {option.icon && <i className={`${option.icon} me-2`}></i>}
                  {option.label}
                  {currentValue === option.value && (
                    <i className="fa-solid fa-check ms-2 text-primary"></i>
                  )}
                </Dropdown.Item>
              ))}
            </>
          )}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default ColumnFilterDropdown;
