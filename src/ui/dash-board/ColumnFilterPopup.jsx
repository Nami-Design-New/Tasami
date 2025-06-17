import { useEffect, useRef } from "react";

const ColumnFilterPopup = ({
  onClose,
  filterType,
  filterValue,
  setFilterValue,
  onSortChange,
  sortDirection,
  isRTL,
  options = [],
}) => {
  const popupRef = useRef();

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [onClose]);

  return (
    <div className={`popup__filter ${isRTL ? "rtl" : "ltr"}`} ref={popupRef}>
      <button className="close-btn" onClick={onClose}>
        <i className="fa-solid fa-circle-xmark"></i>
      </button>
      <div className="popup__filter--wrapper">
        {/* Filter Field */}
        {filterType === "text" && (
          <input
            type="text"
            value={filterValue ?? ""}
            onChange={(e) => setFilterValue(e.target.value)}
            placeholder={isRTL ? "أدخل فلتر" : "Enter filter"}
          />
        )}

        {filterType === "select" && (
          <select
            value={filterValue ?? ""}
            onChange={(e) => setFilterValue(e.target.value)}
          >
            <option value="">{isRTL ? "الكل" : "All"}</option>
            {options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        )}
        <div className="sort-controls">
          <span>{isRTL ? "الفرز:" : "Sort:"}</span>
          <button onClick={() => onSortChange("asc")}>
            {isRTL ? "تصاعدي" : "Asc"}
          </button>
          <button onClick={() => onSortChange("desc")}>
            {isRTL ? "تنازلي" : "Desc"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ColumnFilterPopup;
