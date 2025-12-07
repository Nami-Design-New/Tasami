export const ReportCard = ({
  title,
  value,
  percentage,
  // highlight,
  cardNumber,
  langDir,
  shape,
  riyal,
}) => {
  return (
    <div className={`metric-card-${cardNumber} position-relative`}>
      <div className="d-flex align-items-center gap-2 mb-2">
        <input type="checkbox" id={title} />
        <label style={{ fontSize: "14px" }} htmlFor={title}>
          {title}
        </label>
      </div>

      <div className="d-flex align-items-center gap-2">
        <h2 className="metric-value">
          {value} <span className="fs-6">{riyal !== undefined && riyal}</span>
        </h2>

        {percentage !== undefined && value !== undefined && (
          <>
            {!riyal && <div className="seperatorDiv"></div>}
            <span className={`metric-percentage text-secondary`}>
              {percentage}%
            </span>
          </>
        )}
        {percentage !== undefined && value === undefined && (
          <>
            <span
              className={`metric-percentage fs-2 ${
                percentage < 0 ? "text-danger" : "text-success"
              }`}
            >
              {percentage}%
            </span>
          </>
        )}
      </div>
      {shape && (
        <span
          className={`position-absolute bottom-0 text-info p-2 ${
            langDir == "ar" ? "start-0" : "end-0"
          }`}
        >
          [ ]
        </span>
      )}
    </div>
  );
};
