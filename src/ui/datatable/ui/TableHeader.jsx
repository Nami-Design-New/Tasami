import { flexRender } from "@tanstack/react-table";
import TableColumnFilter from "./TableColumnFilter";

const TableHeader = ({
  table,
  sorting,
  filtering,
  filterConfig,
  isLoading,
}) => {
  const getSortIndicator = (column) => {
    const sort = table.getState().sorting.find((s) => s.id === column.id);

    if (!sort) return null;
    return sort.desc ? (
      <i className="fa-solid fa-arrow-down"></i>
    ) : (
      <i className="fa-solid fa-arrow-up"></i>
    );
  };

  return (
    <thead className="table-light">
      {table.getHeaderGroups().map((headerGroup) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <th key={header.id} width={header.getSize()}>
              <div className="d-flex align-items-center justify-content-center gap-2">
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext(),
                )}

                {/* SORT */}
                {header.column.columnDef.enableSorting && (
                  <button
                    className="btn btn-sm btn-link p-0"
                    disabled={isLoading}
                    onClick={() => sorting.handleSort(header.column.id)}
                  >
                    <i className="fa-solid fa-sort"></i>
                    {getSortIndicator(header.column)}
                  </button>
                )}

                {/* FILTER */}
                {header.column.columnDef.enableFiltering && (
                  <TableColumnFilter
                    value={
                      filtering?.columnFilters?.find(
                        (f) => f.id === header.column.id,
                      )?.value
                    }
                    onChange={(value) =>
                      filtering?.setColumnFilter(header.column.id, value)
                    }
                    config={filterConfig[header.column.id]}
                    label ={header.column.columnDef.header}
                  />
                )}
              </div>
            </th>
          ))}
        </tr>
      ))}
    </thead>
  );
};

export default TableHeader;
