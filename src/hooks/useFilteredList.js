// src/hooks/useFilteredList.js
import { useState, useMemo } from "react";

export default function useFilteredList(items, filterKey = "type", searchKeys = []) {
  const [activeTab, setActiveTab] = useState("الكل");
  const [searchValue, setSearchValue] = useState("");

  const types = [...new Set(items.map((item) => item[filterKey]))];
  const tabs = ["الكل", ...types];

  const filteredItems = useMemo(() => {
    const search = searchValue.trim().toLowerCase();
    return items.filter((item) => {
      const matchesTab = activeTab === "الكل" || item[filterKey] === activeTab;
      const matchesSearch = searchKeys.some((key) =>
        String(item[key]).toLowerCase().includes(search)
      );

      return matchesTab && matchesSearch;
    });
  }, [items, activeTab, searchValue, filterKey, searchKeys]);

  return { activeTab, setActiveTab, searchValue, setSearchValue, tabs, filteredItems };
}
