const StatisticsCard = ({item}) => {
  return (
    <div className="stat-item--card">
      <div className="icon" style={{ backgroundColor: item.bgColor }}>
        <i className={`fa ${item.icon}`} style={{ color: item.color }}></i>
      </div>
      <div className="text">
        <div className="value">{item.value}</div>
        <div className="label">{item.label}</div>
      </div>
    </div>
  );
};

export default StatisticsCard;
