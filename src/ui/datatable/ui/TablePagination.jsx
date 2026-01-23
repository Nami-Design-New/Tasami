import { useTranslation } from "react-i18next";

const TablePagination = ({
  currentPage = 1,
  lastPage = 1,
  onPageChange,
  isLoading = false,
}) => {
  const { t } = useTranslation();

  const handlePrevious = () => {
    if (currentPage > 1 && !isLoading) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < lastPage && !isLoading) {
      onPageChange(currentPage + 1);
    }
  };

  // -----------------------------
  // SMART PAGINATION
  // -----------------------------
  const getVisiblePages = () => {
    const pages = [];
    const maxVisible = 5;

    if (lastPage <= maxVisible) {
      return Array.from({ length: lastPage }, (_, i) => i + 1);
    }

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(lastPage - 1, currentPage + 1);

    pages.push(1);

    if (start > 2) pages.push("...");

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < lastPage - 1) pages.push("...");

    pages.push(lastPage);

    return pages;
  };

  return (
    <div className="pagination-container d-flex justify-content-between align-items-center">
      {/* Buttons */}
      <div className="pagination-buttons d-flex align-items-center gap-2">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1 || isLoading}
          className="btn btn-light prev"
          style={{
            cursor: currentPage === 1 || isLoading ? "not-allowed" : "pointer",
          }}
        >
          {t("dashboard.table.previous")}
        </button>

        {/* Page Numbers */}
        <div className="page-numbers d-flex gap-2">
          {getVisiblePages().map((page, index) =>
            page === "..." ? (
              <span key={`ellipsis-${index}`} className="pagination-ellipsis">
                ...
              </span>
            ) : (
              <button
                key={page}
                onClick={() => !isLoading && onPageChange(page)}
                disabled={isLoading}
                className={`page-number ${
                  currentPage === page ? "active" : ""
                }`}
              >
                {page}
              </button>
            ),
          )}
        </div>

        <button
          onClick={handleNext}
          disabled={currentPage === lastPage || isLoading}
          className="btn btn-light next"
          style={{
            cursor:
              currentPage === lastPage || isLoading ? "not-allowed" : "pointer",
          }}
        >
          {t("dashboard.table.next")}
        </button>
      </div>

      {/* Info */}
      <div className="pagination-info">
        {t("dashboard.table.page")} <strong>{currentPage}</strong>{" "}
        {t("dashboard.table.of")} <strong>{lastPage}</strong>
      </div>
    </div>
  );
};

export default TablePagination;
