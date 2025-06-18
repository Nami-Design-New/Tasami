import ChartCard from "./ChartCard";

const StatisticsCard = ({ data = [], updated, title }) => {
  return (
    <ChartCard title={title || "الاحصائيات"}>
      <div className="row">
        {data &&
          data.map((item, index) => (
            <div className="col-6  col-md-3 col-xxl-2 p-2" key={index}>
              <div className="stat-item--card">
                <div className="icon" style={{ backgroundColor: item.bgColor }}>
                  <i
                    className={`fa ${item.icon}`}
                    style={{ color: item.color }}
                  ></i>
                </div>
                <div className="text">
                  <div className="value">{item.value}</div>
                  <div className="label">{item.label}</div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </ChartCard>
  );
};

export default StatisticsCard;
