// import { useEffect, useRef } from "react";
// import { OverlayTrigger, Popover } from "react-bootstrap";
// import { useSelector } from "react-redux";
// import InputField from "../forms/InputField";
// import TableColumnVisibility from "./TableColumnVisibility";
// const TableFilter = ({
//   filter = true,
//   search = true,
//   globalFilter,
//   setGlobalFilter,
//   columnFilters,
//   setColumnFilters,
//   filterOptions = {},
//   activeFilters = [],
//   searchPlaceholder,
//   table,
// }) => {
//   const lang = useSelector((state) => state.language.lang);
//   const isRTL = lang === "ar";

//   const popoverRefs = useRef({});

//   const defaultSearchPlaceholder = isRTL ? "بحث" : "Search";

//   const searchText = searchPlaceholder || defaultSearchPlaceholder;

//   useEffect(() => {
//     function handleClickOutside(event) {
//       const isFilterButton = event.target.closest(".filter-button");
//       if (!isFilterButton) {
//         activeFilters.forEach((filterType) => {
//           const filterConfig = filterOptions[filterType];
//           if (filterConfig) {
//             const popoverElement = document.getElementById(
//               `popover-${filterConfig.id}`,
//             );
//             if (popoverElement && !popoverElement.contains(event.target)) {
//               if (popoverRefs.current[filterConfig.id]) {
//                 popoverRefs.current[filterConfig.id] = false;
//               }
//             }
//           }
//         });
//       }
//     }

//     document.body.addEventListener("click", handleClickOutside);
//     return () => {
//       document.body.removeEventListener("click", handleClickOutside);
//     };
//   }, [activeFilters, filterOptions]);

//   return (
//     <div className="table-filter ">
//       <TableColumnVisibility table={table} />
//       {search === true && (
//         <InputField
//           className="search-input"
//           type="text"
//           placeholder={searchText}
//           value={globalFilter ?? ""}
//           onChange={(e) => setGlobalFilter(e.target.value)}
//         />
//       )}
//       {filter === true && (
//         <div className="filter-buttons">
//           {activeFilters.map((filterType) => {
//             const filterConfig = filterOptions[filterType];
//             if (!filterConfig) return null;
//             return (
//               <OverlayTrigger
//                 key={filterConfig.id}
//                 trigger="click"
//                 placement="bottom"
//                 rootClose={true}
//                 onToggle={(nextShow) => {
//                   popoverRefs.current[filterConfig.id] = nextShow;
//                 }}
//                 overlay={
//                   <Popover id={`popover-${filterConfig.id}`}>
//                     <Popover.Header as="h3">
//                       {filterConfig.label[lang] || filterConfig.label.ar}
//                     </Popover.Header>
//                     <Popover.Body>
//                       <div className="status-container">
//                         {filterConfig.options.map((option, index) => (
//                           <button
//                             key={index}
//                             className={`${
//                               columnFilters.some(
//                                 (filter) =>
//                                   filter.id === filterConfig.id &&
//                                   filter.value === option,
//                               )
//                                 ? "selected"
//                                 : ""
//                             }`}
//                             onClick={() =>
//                               setColumnFilters((prev) => {
//                                 const existingFilter = prev.find(
//                                   (filter) => filter.id === filterConfig.id,
//                                 );

//                                 if (!existingFilter) {
//                                   return [
//                                     ...prev,
//                                     {
//                                       id: filterConfig.id,
//                                       value: option,
//                                     },
//                                   ];
//                                 }

//                                 if (existingFilter.value === option) {
//                                   return prev.filter(
//                                     (filter) => filter.id !== filterConfig.id,
//                                   );
//                                 }

//                                 return prev.map((filter) => {
//                                   if (filter.id === filterConfig.id) {
//                                     return { ...filter, value: option };
//                                   }
//                                   return filter;
//                                 });
//                               })
//                             }
//                           >
//                             {filterConfig.getIcon ? (
//                               <div
//                                 className={
//                                   filterConfig.getIcon(option).className
//                                 }
//                               ></div>
//                             ) : null}
//                             {option}
//                           </button>
//                         ))}
//                       </div>
//                     </Popover.Body>
//                   </Popover>
//                 }
//               >
//                 <button
//                   className="button filter-button"
//                   id={`dropdown-${filterConfig.id}`}
//                 >
//                   <span>
//                     {isRTL
//                       ? filterConfig.label.ar.split(":")[0]
//                       : filterConfig.label.en.split(":")[0]}
//                   </span>
//                   <i className="fa-regular fa-filter"></i>
//                 </button>
//               </OverlayTrigger>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// };

// export default TableFilter;
//----------------------------------------------------------------------------------------
import { useEffect, useRef } from "react";
import { OverlayTrigger, Popover } from "react-bootstrap";
import { useSelector } from "react-redux";
import InputField from "../forms/InputField";
import TableColumnVisibility from "./TableColumnVisibility";

const TableFilter = ({
  filter = true,
  search = true,
  globalFilter,
  setGlobalFilter,
  columnFilters,
  setColumnFilters,
  resetFilters,
  filterOptions = {},
  activeFilters = [],
  searchPlaceholder,
  table,
}) => {
  const lang = useSelector((state) => state.language.lang);
  const isRTL = lang === "ar";

  const popoverRefs = useRef({});

  const defaultSearchPlaceholder = isRTL ? "بحث" : "Search";
  const searchText = searchPlaceholder || defaultSearchPlaceholder;
  console.log("column filters:", columnFilters);

  useEffect(() => {
    function handleClickOutside(event) {
      const isFilterButton = event.target.closest(".filter-button");
      if (!isFilterButton) {
        activeFilters.forEach((filterType) => {
          const filterConfig = filterOptions[filterType];
          if (filterConfig) {
            const popoverElement = document.getElementById(
              `popover-${filterConfig.id}`,
            );
            if (popoverElement && !popoverElement.contains(event.target)) {
              popoverRefs.current[filterConfig.id] = false;
            }
          }
        });
      }
    }

    document.body.addEventListener("click", handleClickOutside);
    return () => document.body.removeEventListener("click", handleClickOutside);
  }, [activeFilters, filterOptions]);

  return (
    <div className="table-filter">
      <TableColumnVisibility table={table} />

      {search && (
        <InputField
          className="search-input"
          type="text"
          placeholder={searchText}
          value={globalFilter ?? ""}
          onChange={(e) => {
            console.log("🔍 SEARCH INPUT:", e.target.value);
            setGlobalFilter(e.target.value);
          }}
        />
      )}

      {filter && (
        <div className="filter-buttons">
          {activeFilters.map((filterType) => {
            const filterConfig = filterOptions[filterType];
            if (!filterConfig) return null;

            return (
              <OverlayTrigger
                key={filterConfig.id}
                trigger="click"
                placement="bottom"
                rootClose
                overlay={
                  <Popover id={`popover-${filterConfig.id}`}>
                    <Popover.Header as="h3">
                      {filterConfig.label[lang] || filterConfig.label.en}
                    </Popover.Header>
                    <Popover.Body>
                      <div className="status-container">
                        {filterConfig.type === "select" && (
                          <select
                            className="form-select"
                            value={
                              columnFilters.find(
                                (f) => f.id === filterConfig.id,
                              )?.value ?? ""
                            }
                            onChange={(e) => {
                              const value = e.target.value || null;

                              setColumnFilters((prev) => {
                                const next = prev.filter(
                                  (f) => f.id !== filterConfig.id,
                                );

                                if (value !== null) {
                                  next.push({
                                    id: filterConfig.id,
                                    value,
                                  });
                                }

                                return next;
                              });
                            }}
                          >
                            <option value="">All</option>
                            {filterConfig.options.map((o) => (
                              <option
                                key={filterConfig.getValue(o)}
                                value={filterConfig.getValue(o)}
                              >
                                {filterConfig.getLabel(o)}
                              </option>
                            ))}
                          </select>
                        )}
                        {filterConfig.type === "date" && (
                          <input
                            type="date"
                            className="form-control"
                            value={
                              columnFilters.find(
                                (f) => f.id === filterConfig.id,
                              )?.value ?? ""
                            }
                            onChange={(e) => {
                              const value = e.target.value || null;

                              setColumnFilters((prev) => {
                                const next = prev.filter(
                                  (f) => f.id !== filterConfig.id,
                                );

                                if (value) {
                                  next.push({
                                    id: filterConfig.id,
                                    value,
                                  });
                                }

                                return next;
                              });
                            }}
                          />
                        )}
                      </div>
                    </Popover.Body>
                  </Popover>
                }
              >
                <button className="button filter-button">
                  {filterConfig.label[lang] || filterConfig.label.en}
                </button>
              </OverlayTrigger>
            );
          })}

          <button
            type="button"
            className="btn btn-outline-secondary d-flex align-items-center gap-1"
            onClick={() => {
              console.log("🧹 RESET FILTERS UI");
              resetFilters();
            }}
            title={isRTL ? "إعادة تعيين الفلاتر" : "Reset Filters"}
          >
            <i className="fa-solid fa-rotate-left"></i>
          </button>
        </div>
      )}
    </div>
  );
};

export default TableFilter;
