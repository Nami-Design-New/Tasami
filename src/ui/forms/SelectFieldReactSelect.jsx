// src/ui/forms/SelectFieldReactSelect.jsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import ReactSelect, { components } from "react-select";

const SelectFieldReactSelect = ({
  // External control (from react-hook-form Controller)
  value,
  onChange,
  onBlur,

  // Field props
  label,
  hint,
  error,
  labelHint,
  options = [],
  loading = false,
  disabled = false,
  onMenuScrollToBottom,
  placeholder,

  // Select features
  isMulti = false,
  isClearable = true,
  isSearchable = true,
  closeMenuOnSelect = false,
  hideSelectedOptions = true,

  // Optional: name for accessibility
  name,
}) => {
  const { t } = useTranslation();

  // Auto-detect dark mode
  const isDark = document.documentElement.getAttribute("data-theme") === "dark";

  const formattedOptions = useMemo(
    () =>
      options.map((opt) => ({
        value: opt.value,
        label: opt.name ?? opt.label ?? opt.value,
      })),
    [options]
  );

  // Convert external value to react-select format
  const selectedValue = useMemo(() => {
    if (isMulti && Array.isArray(value)) {
      return formattedOptions.filter((opt) => value.includes(opt.value));
    }
    return formattedOptions.find((opt) => opt.value === value) || null;
  }, [value, formattedOptions, isMulti]);

  const customStyles = {
    control: (base, state) => ({
      ...base,
      minHeight: 38,
      borderRadius: 6,
      borderWidth: 1,
      borderColor: error
        ? "#dc3545"
        : state.isFocused
        ? isDark
          ? "#4da3ff"
          : "#80bdff"
        : isDark
        ? "#495057"
        : "#ced4da",
      backgroundColor: disabled
        ? isDark
          ? "#343a40"
          : "#e9ecef"
        : isDark
        ? "#212529"
        : "white",
      boxShadow: state.isFocused
        ? error
          ? "0 0 0 0.2rem rgba(220, 53, 69, 0.25)"
          : `0 0 0 0.2rem ${
              isDark ? "rgba(77, 163, 255, 0.3)" : "rgba(0, 123, 255, 0.25)"
            }`
        : "none",
      fontSize: "0.875rem",
      "&:hover": {
        borderColor: error ? "#dc3545" : isDark ? "#6c757d" : "#adb5bd",
      },
      cursor: disabled ? "not-allowed" : "default",
    }),
    menu: (base) => ({
      ...base,
      marginTop: 4,
      borderRadius: 6,
      backgroundColor: isDark ? "#2d2d2d" : "white",
      border: `1px solid ${isDark ? "#495057" : "#dee2e6"}`,
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
      zIndex: 1050,
    }),
    menuList: (base) => ({
      ...base,
      maxHeight: 200,
      padding: 0,
      "::-webkit-scrollbar": { width: "8px" },
      "::-webkit-scrollbar-thumb": {
        backgroundColor: isDark ? "#555" : "#ccc",
        borderRadius: "4px",
      },
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected
        ? isDark
          ? "#0d6efd"
          : "#007bff"
        : state.isFocused
        ? isDark
          ? "#3a3a3a"
          : "#f8f9fa"
        : "transparent",
      color: state.isSelected ? "white" : isDark ? "#e9ecef" : "#212529",
      padding: "8px 12px",
      fontSize: "0.875rem",
      cursor: "pointer",
    }),
    singleValue: (base) => ({
      ...base,
      color: isDark ? "#e9ecef" : "#495057",
    }),
    multiValue: (base) => ({
      ...base,
      backgroundColor: isDark ? "#495057" : "#e9ecef",
      borderRadius: 4,
    }),
    multiValueLabel: (base) => ({
      ...base,
      color: isDark ? "#fff" : "#212529",
      fontSize: "0.8125rem",
    }),
    multiValueRemove: (base) => ({
      ...base,
      color: isDark ? "#aaa" : "#6c757d",
      ":hover": {
        backgroundColor: isDark ? "#6c757d" : "#dee2e6",
        color: isDark ? "#fff" : "#212529",
      },
    }),
    placeholder: (base) => ({
      ...base,
      color: isDark ? "#aaa" : "#6c757d",
    }),
    input: (base) => ({
      ...base,
      color: isDark ? "#e9ecef" : "#495057",
    }),
    indicatorSeparator: () => ({ display: "none" }),
    dropdownIndicator: (base, state) => ({
      ...base,
      color: isDark ? "#aaa" : "#6c757d",
      padding: "0 8px",
      transition: "transform 0.2s",
      transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : "rotate(0)",
    }),
    clearIndicator: (base) => ({
      ...base,
      color: isDark ? "#aaa" : "#6c757d",
      ":hover": { color: isDark ? "#fff" : "#212529" },
    }),
  };

  const DropdownIndicator = (props) => (
    <components.DropdownIndicator {...props}>
      <i className="fa-solid fa-chevron-down"></i>{" "}
    </components.DropdownIndicator>
  );

  const ClearIndicator = (props) => (
    <components.ClearIndicator {...props}>
      <i className="fa-solid fa-x"></i>
    </components.ClearIndicator>
  );

  return (
    <div className="input-field">
      {label && (
        <div className="d-flex align-items-center justify-content-between mb-1">
          <label className="form-label mb-0">{label}</label>
          {labelHint && <small className="text-muted">{labelHint}</small>}
        </div>
      )}

      <ReactSelect
        name={name}
        isMulti={isMulti}
        isClearable={isClearable}
        isSearchable={isSearchable}
        isDisabled={disabled}
        isLoading={loading}
        closeMenuOnSelect={closeMenuOnSelect}
        hideSelectedOptions={false}
        options={formattedOptions}
        value={selectedValue}
        onChange={(selected) => {
          const newValue = isMulti
            ? selected
              ? selected.map((s) => s.value)
              : []
            : selected
            ? selected.value
            : "";
          onChange(newValue);
        }}
        onBlur={onBlur}
        placeholder={placeholder || t("select")}
        onMenuScrollToBottom={onMenuScrollToBottom}
        styles={customStyles}
        components={{
          DropdownIndicator,
          ClearIndicator,
        }}
        classNamePrefix="react-select"
      />

      {hint && <small className="form-text text-muted d-block">{hint}</small>}
      {error && <div className="invalid-feedback d-block">{error}</div>}
    </div>
  );
};

export default SelectFieldReactSelect;
