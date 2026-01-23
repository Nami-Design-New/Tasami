import { useTableFilters } from "../hooks/useTableFilters";
import { useTableSorting } from "../hooks/useTableSorting";
import { useCreateTable } from "../adapters/tanstackAdapter";
import { useTablePagination } from "../hooks/useTablePagination";
import { useTableSearch } from "../hooks/useTableSearch";
import { useTableDnD } from "../hooks/useTableDnD";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import TablePagination from "./TablePagination";
import TableSearch from "./TableSearch";
import { useTranslation } from "react-i18next";
import TableColumnVisibility from "./TableColumnVisibility";

const DataTable = ({
  title,
  data,
  columns,
  pagination,
  sorting,
  filtering,
  filterConfig,
  dnd,
  search,
  loading,
}) => {

  const paginationHook = useTablePagination(pagination);
  const filters = useTableFilters({
    ...filtering,
    setPage: pagination.onPageChange,
  });
  const sort = useTableSorting({
    ...sorting,
    setPage: pagination.onPageChange,
  });

  const dndHook = useTableDnD({ ...dnd, data });

  const { value, onChange } = useTableSearch({
    ...search,
    setPage: pagination.onPageChange,
  });

  const table = useCreateTable({
    data: dnd?.enabled ? dndHook.dragData : data,
    columns,
    state: {
      columnFilters: filters.columnFilters,
      sorting: sort.sortingState,
      pagination: paginationHook.state,
    },
    pageCount: pagination.lastPage,
    sorting,
    filtering,
    pagination
  });

  return (
    <div className="card__custom">
      <div className="header d-flex justify-content-between">
        <h3 className="header__title">{title}</h3>
        <div className="table-filter">
          <TableColumnVisibility table={table} />
          <TableSearch
            searchValue={value}
            onChange={onChange}
            searchPlaceholder={search?.searchPlaceholder}
            search={search.enabled}
          />
        </div>
      </div>
      <div className="card__body">
        <div className="table-container table-responsive border">
          <table className="custom-table table table-bordered text-center align-middle mb-0">
            <TableHeader
              table={table}
              sorting={sort}
              filtering={filters}
              filterConfig={filterConfig}
              isLoading={loading}
            />

            <TableBody
              table={table}
              columns={columns}
              rowDnD={dnd?.enabled}
              dnd={dndHook}
              isLoading={loading}
              pageSize={pagination.pageSize}
            />
          </table>
          <div className="card--footer">
            <TablePagination {...paginationHook.ui} isLoading={loading} />  
          </div>
              
        </div>
      </div>
    </div>
  );
};

export default DataTable;
