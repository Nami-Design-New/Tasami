import { useEffect, useRef } from "react";
import { OverlayTrigger, Popover } from "react-bootstrap";
import { useSelector } from "react-redux";
import InputField from "../../forms/InputField";

const DEFAULT_STATUS = ["نشط", "موقوف"];

const TableFilter = ({
  filter = true,
  search = true,
  globalFilter,
  setGlobalFilter,
  columnFilters,
  setColumnFilters,
  filterOptions = {
    status: {
      id: "status",
      label: { ar: "فرز بواسطه الحاله :", en: "Filter by Status:" },
      options: DEFAULT_STATUS,
      getIcon: (option) => ({
        className: `color-icon ${option === "نشط" ? "active" : "inactive"}`,
      }),
    },
    operation: {
      id: "operation",
      label: { ar: "فرز بواسطه العملية :", en: "Filter by Operation:" },
      options: ["إرسال", "استلام"],
    },
    model: {
      id: "model",
      label: { ar: "فرز بواسطه النموذج :", en: "Filter by Model:" },
      options: ["نموذج A", "نموذج B", "نموذج C", "نموذج D", "نموذج E"],
    },
    action: {
      id: "action",
      label: { ar: "فرز بواسطه الإجراء :", en: "Filter by Action:" },
      options: ["عرض", "تحقق", "تعديل", "مراجعة", "إغلاق"],
    },
  },
  activeFilters = ["status"],
  filterButtonText,
  searchPlaceholder,
}) => {
  const lang = useSelector((state) => state.language.lang);
  const isRTL = lang === "ar";

  const popoverRefs = useRef({});

  const defaultFilterText = isRTL ? "فرز" : "Filter";
  const defaultSearchPlaceholder = isRTL ? "بحث" : "Search";

  const buttonText = filterButtonText || defaultFilterText;
  const searchText = searchPlaceholder || defaultSearchPlaceholder;

  console.log("Current column filters:", columnFilters);

  useEffect(() => {
    function handleClickOutside(event) {
      const isFilterButton = event.target.closest(".filter-button");
      if (!isFilterButton) {
        activeFilters.forEach((filterType) => {
          const filterConfig = filterOptions[filterType];
          if (filterConfig) {
            const popoverElement = document.getElementById(
              `popover-${filterConfig.id}`
            );
            if (popoverElement && !popoverElement.contains(event.target)) {
              if (popoverRefs.current[filterConfig.id]) {
                popoverRefs.current[filterConfig.id] = false;
              }
            }
          }
        });
      }
    }

    document.body.addEventListener("click", handleClickOutside);
    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, [activeFilters, filterOptions]);

  return (
    <div className="table-filter d-flex align-items-center gap-2">
      {search === true && (
        <InputField
          type="text"
          placeholder={searchText}
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
        />
      )}
      {filter === true &&
        activeFilters.map((filterType) => {
          const filterConfig = filterOptions[filterType];
          if (!filterConfig) return null;
          return (
            <OverlayTrigger
              key={filterConfig.id}
              trigger="click"
              placement="bottom"
              rootClose={true}
              onToggle={(nextShow) => {
                popoverRefs.current[filterConfig.id] = nextShow;
              }}
              overlay={
                <Popover id={`popover-${filterConfig.id}`}>
                  <Popover.Header as="h3">
                    {filterConfig.label[lang] || filterConfig.label.ar}
                  </Popover.Header>
                  <Popover.Body>
                    <div className="status-container">
                      {filterConfig.options.map((option, index) => (
                        <button
                          key={index}
                          className={`${
                            columnFilters.some(
                              (filter) =>
                                filter.id === filterConfig.id &&
                                filter.value === option
                            )
                              ? "selected"
                              : ""
                          }`}
                          onClick={() =>
                            setColumnFilters((prev) => {
                              const existingFilter = prev.find(
                                (filter) => filter.id === filterConfig.id
                              );

                              if (!existingFilter) {
                                return [
                                  ...prev,
                                  {
                                    id: filterConfig.id,
                                    value: option,
                                  },
                                ];
                              }

                              if (existingFilter.value === option) {
                                return prev.filter(
                                  (filter) => filter.id !== filterConfig.id
                                );
                              }

                              return prev.map((filter) => {
                                if (filter.id === filterConfig.id) {
                                  return { ...filter, value: option };
                                }
                                return filter;
                              });
                            })
                          }
                        >
                          {filterConfig.getIcon ? (
                            <div
                              className={filterConfig.getIcon(option).className}
                            ></div>
                          ) : null}
                          {option}
                        </button>
                      ))}
                    </div>
                  </Popover.Body>
                </Popover>
              }
            >
              <button
                className="button filter-button"
                id={`dropdown-${filterConfig.id}`}
              >
                <span>
                  {isRTL
                    ? filterConfig.label.ar.split(":")[0]
                    : filterConfig.label.en.split(":")[0]}
                </span>
                <i className="fa-regular fa-filter"></i>
              </button>
            </OverlayTrigger>
          );
        })}
    </div>
  );
};

export default TableFilter;
