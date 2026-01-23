import { useSelector } from "react-redux";
import InputField from "../forms/InputField";
import TableColumnVisibility from "./TableColumnVisibility";

const TableOptions = ({
  search = true,
  globalFilter,
  setGlobalFilter,
  searchPlaceholder,
  table,
}) => {
  const lang = useSelector((state) => state.language.lang);
  const isRTL = lang === "ar";

  const defaultSearchPlaceholder = isRTL ? "بحث" : "Search";
  const searchText = searchPlaceholder || defaultSearchPlaceholder;

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
            setGlobalFilter(e.target.value);
          }}
        />
      )}
    </div>
  );
};

export default TableOptions;
