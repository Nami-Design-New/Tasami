import { useTranslation } from "react-i18next";

const TablePagentaion = ({ table }) => {
  const { t } = useTranslation();

  return (
    <div className="pagination-container d-flex justify-content-between">
      <div className="pagination-buttons">
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="prev"
          style={{
            cursor: !table.getCanPreviousPage() ? "not-allowed" : "pointer",
          }}
        >
          {t("dashboard.table.previous")}
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
            cursor: !table.getCanNextPage() ? "not-allowed" : "pointer",
          }}
        >
          {t("dashboard.table.next")}
        </button>
      </div>

      <div className="pagination-info">
        {t("dashboard.table.page")} {table.getState().pagination.pageIndex + 1}{" "}
        {t("dashboard.table.of")} {table.getPageCount()}
      </div>
    </div>
  );
};

export default TablePagentaion;
