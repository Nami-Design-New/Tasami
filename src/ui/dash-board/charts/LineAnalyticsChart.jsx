import ReactApexChart from "react-apexcharts";
import ChartCard from "../cards/ChartCard";

const LineAnalyticsChart = ({
  series,
  title,
  options,
  subtitle,
  type = "line",
  height = 350,
}) => {
  return (
    <ChartCard title={title}>
      {subtitle && <p className="subtitle"> {subtitle} </p>}
      <ReactApexChart
        options={options}
        series={series}
        height={height}
        type={type}
      />
    </ChartCard>
  );
};

export default LineAnalyticsChart;
