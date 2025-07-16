const TablePagentaion = ({ table }) => {
  return (
    <div className="pagination-container  d-flex justify-content-between">
      <div className="pagination-buttons">
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="prev"
          style={{
            cursor: !table.getCanPreviousPage() ? "not-allowed" : "pointer",
          }}
        >
          السابق
        </button>

        <div className="page-numbers d-flex gap-2">
          {Array.from({ length: table.getPageCount() }, (_, i) => (
            <button
              key={i}
              onClick={() => table.setPageIndex(i)}
              className={`page-number ${
                table.getState().pagination.pageIndex === i ? "active" : ""
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>

        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          style={{
            cursor: !table.getCanPreviousPage() ? "not-allowed" : "pointer",
          }}
        >
          التالي
        </button>
      </div>

      <div className="pagination-info">
        {`صفحة ${
          table.getState().pagination.pageIndex + 1
        } من ${table.getPageCount()}`}
      </div>
    </div>
  );
};

export default TablePagentaion;
