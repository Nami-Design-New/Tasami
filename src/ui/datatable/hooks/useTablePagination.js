import { useCallback } from "react";

export const useTablePagination = ({
  currentPage,
  lastPage,
  pageSize,
  onPageSizeChange,
  page,
  onPageChange,
}) => {
  const handlePageChange = useCallback(
    (nextPage) => {
      onPageChange?.(nextPage);
    },
    [onPageChange],
  );

  return {
    state: {
      pageIndex: currentPage - 1,
      pageSize,
    },
    ui: {
      currentPage: page,
      lastPage,
      onPageChange: handlePageChange,
    },
    onPageSizeChange,
  };
};
