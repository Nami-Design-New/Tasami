import ReactApexChart from "react-apexcharts";
import ChartCard from "../cards/ChartCard";

const ColumnChart = ({ series, options, title, height = 350 }) => {
  return (
    <ChartCard title={title}>
      <div className="user-growth-chart">
        <ReactApexChart
          options={options}
          series={series}
          type="bar"
          height={height}
        />
      </div>
    </ChartCard>
  );
};

export default ColumnChart;
