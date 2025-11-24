import { useTranslation } from "react-i18next";

const TablePagination = ({
  currentPage = 1,
  lastPage = 1,
  onPageChange,
  isLoading = false,
}) => {
  const { t } = useTranslation();

  const handlePrevious = () => {
    if (currentPage > 1 && !isLoading) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < lastPage && !isLoading) onPageChange(currentPage + 1);
  };

  return (
    <div className="pagination-container d-flex justify-content-between align-items-center">
      {/* Buttons */}
      <div className="pagination-buttons d-flex align-items-center gap-2">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1 || isLoading}
          className="btn btn-light prev"
          style={{ cursor: currentPage === 1 ? "not-allowed" : "pointer" }}
        >
          {t("dashboard.table.previous")}
        </button>

        {/* Page Numbers */}
        <div className="page-numbers d-flex gap-2">
          {Array.from({ length: lastPage }, (_, i) => (
            <button
              key={i}
              onClick={() => !isLoading && onPageChange(i + 1)}
              disabled={isLoading}
              className={`btn ${
                currentPage === i + 1 ? "btn-primary" : "btn-outline-secondary"
              }`}
            >
              {i + 1}
            </button>
          ))}
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
