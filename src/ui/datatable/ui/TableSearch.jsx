import React from "react";
import { useSelector } from "react-redux";
import InputField from "../../forms/InputField";

export default function TableSearch({
  search = true,
  searchValue,
  onChange,
  searchPlaceholder,
}) {
  const lang = useSelector((state) => state.language.lang);
  const isRTL = lang === "ar";

  const defaultSearchPlaceholder = isRTL ? "بحث" : "Search";
  const searchText = searchPlaceholder || defaultSearchPlaceholder;
  return (
    <div className="table-filter">
      {search && (
        <InputField
          className="search-input"
          type="text"
          placeholder={searchText}
          value={searchValue ?? ""}
          onChange={(e) => {
            onChange(e.target.value);
          }}
        />
      )}
    </div>
  );
}
