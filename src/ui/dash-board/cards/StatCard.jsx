import ReactApexChart from "react-apexcharts";
import { Link } from "react-router";

const StatCard = ({
  icon,
  title,
  value,
  percentage,
  timeframe,
  chartData,
  color = "#805AD5",
}) => {
  const chartOptions = {
    chart: {
      type: "line",
      sparkline: { enabled: true },
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    colors: [color],
    tooltip: {
      enabled: false,
    },
  };

  const chartSeries = [
    {
      data: chartData,
    },
  ];

  return (
    <div className="stat-card">
      <div className="left">
        <div className="icon-circle" style={{ backgroundColor: color }}>
          {icon}
        </div>
      </div>

      <div className="right">
        <div className="details-container">
          <div className="details">
            <p className="title">{title}</p>
            <h2 className="value">{value}</h2>
          </div>
          <ReactApexChart
            options={chartOptions}
            series={chartSeries}
            type="line"
            height={50}
            width={100}
          />
        </div>
        <div className="change">
          <Link className="link" to="#">
            عرض الكل
            <i className="fa-solid fa-left-long"></i>
          </Link>
          <div>
            <span className={`percent  ${percentage > 0 ? "plus" : ""} `}>
              {percentage > 0 ? (
                <i className="fa-solid fa-arrow-up"></i>
              ) : (
                <i className="fa-solid fa-arrow-down"></i>
              )}
              {Math.abs(percentage)}%
            </span>
            <span className="time">{timeframe}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
