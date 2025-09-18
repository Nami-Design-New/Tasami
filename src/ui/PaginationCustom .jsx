function getPaginationRange(currentPage, totalPages, siblingCount = 1) {
  const totalNumbers = siblingCount * 2 + 5;
  if (totalPages <= totalNumbers) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const left = Math.max(currentPage - siblingCount, 2);
  const right = Math.min(currentPage + siblingCount, totalPages - 1);

  let pages = [1];

  if (left > 2) {
    pages.push("…");
  }

  for (let i = left; i <= right; i++) {
    pages.push(i);
  }

  if (right < totalPages - 1) {
    pages.push("…");
  }

  pages.push(totalPages);

  return pages;
}

export default function PaginationCustom({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
}) {
  if (totalPages <= 1) return null;

  const paginationRange = getPaginationRange(
    currentPage,
    totalPages,
    siblingCount
  );

  return (
    <nav className="d-flex justify-content-center mt-4">
      <ul className="pagination">
        {/* First */}
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <button className="page-link" onClick={() => onPageChange(1)}>
            <i className="fa-solid fa-angles-left"></i>
          </button>
        </li>

        {/* Prev */}
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <button
            className="page-link"
            onClick={() => onPageChange(currentPage - 1)}
          >
            <i className="fa-solid fa-angle-left"></i>
          </button>
        </li>

        {/* Numbers */}
        {paginationRange.map((p, idx) =>
          p === "…" ? (
            <li key={idx} className="page-item disabled">
              <span className="page-link">…</span>
            </li>
          ) : (
            <li
              key={p}
              className={`page-item ${p === currentPage ? "active" : ""}`}
            >
              <button className="page-link" onClick={() => onPageChange(p)}>
                {p}
              </button>
            </li>
          )
        )}

        {/* Next */}
        <li
          className={`page-item ${
            currentPage === totalPages ? "disabled" : ""
          }`}
        >
          <button
            className="page-link"
            onClick={() => onPageChange(currentPage + 1)}
          >
            <i className="fa-solid fa-angle-right"></i>
          </button>
        </li>

        {/* Last */}
        <li
          className={`page-item ${
            currentPage === totalPages ? "disabled" : ""
          }`}
        >
          <button
            className="page-link"
            onClick={() => onPageChange(totalPages)}
          >
            <i className="fa-solid fa-angles-right"></i>
          </button>
        </li>
      </ul>
    </nav>
  );
}
