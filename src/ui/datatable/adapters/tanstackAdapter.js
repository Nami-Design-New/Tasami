import {
  createColumnHelper,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

export const useCreateTable = ({
  data,
  columns,
  state,
  pageCount,
  sorting,
  pagination,
  filtering,
}) => {
  return useReactTable({
    data,
    columns,
    state,
    manualPagination: true,
    manualSorting: sorting.server,
    manualFiltering: filtering.server,
    pageCount,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getRowId: (row) => String(row.id),
    onPaginationChange: pagination?.onPageChange,
  });
};
export const columnHelper = createColumnHelper();
