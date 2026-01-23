import { useEffect, useState } from "react";

export const useTableSearch = ({
  value,
  onChange,
  debounceMs = 500,
  setPage,
}) => {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  useEffect(() => {
    const timer = setTimeout(() => {
      onChange?.(localValue);
      setPage?.(1);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [localValue,debounceMs , onChange , setPage]);

  return {
    value: localValue,
    onChange: setLocalValue,
  };
};
