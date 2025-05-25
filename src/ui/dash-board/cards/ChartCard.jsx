const ChartCard = ({ title, children }) => {
  return (
    <div className="card__custom">
      <div className="header">
        <h3 className="header__title">{title}</h3>
      </div>
      <div className="card__body  ">{children}</div>
    </div>
  );
};

export default ChartCard;
