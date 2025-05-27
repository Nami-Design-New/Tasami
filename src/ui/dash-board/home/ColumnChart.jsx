import ReactApexChart from "react-apexcharts";
import ChartCard from "../cards/ChartCard";

const ColumnChart = ({ series, options, title }) => {
  return (
    <ChartCard title={title}>
      <div className="user-growth-chart">
        <ReactApexChart
          options={options}
          series={series}
          type="bar"
          height={350}
        />
      </div>
    </ChartCard>
  );
};

export default ColumnChart;
