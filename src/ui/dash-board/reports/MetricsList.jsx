const MetricsList = ({ list, handleMetricToggle, watch, errors, setValue }) => {
  return (
    <>
      <ul className="metrics-list">
        <li className="metrics-item">
          <input
            type="checkbox"
            className="metrics-input"
            id="selectAllMetrics"
            checked={watch("metrics")?.length === list.length}
            onChange={(e) => {
              if (e.target.checked) {
                setValue(
                  "metrics",
                  list.map((m) => m.id)
                );
              } else {
                setValue("metrics", []);
              }
            }}
          />
          <label htmlFor="selectAllMetrics">تحديد الكل</label>
        </li>

        {list.map((metric) => (
          <li key={metric.id} className="metrics-item">
            <input
              type="checkbox"
              className="metrics-input"
              id={`metric-${metric.id}`}
              checked={watch("metrics")?.includes(metric.id)}
              onChange={() => handleMetricToggle(metric.id)}
            />
            <label htmlFor={`metric-${metric.id}`}>{metric.name}</label>
          </li>
        ))}
      </ul>
      {errors.metrics && (
        <div className="text-danger small">{errors.metrics.message}</div>
      )}
    </>
  );
};

export default MetricsList;
