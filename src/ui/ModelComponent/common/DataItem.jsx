const DataItem = ({ label, value }) => (
  <div className="data-item">
    <h3 className="data-item__label">{label}:</h3>
    <p className="data-item__value">{value}</p>
  </div>
);

export default DataItem;
