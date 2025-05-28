// components/DonutChart.js
import ReactApexChart from "react-apexcharts";
import ChartCard from "../cards/ChartCard";

const DounutCharts = ({
  options,
  series,
  title,
  width = 300,
  height = 300,
}) => {
  return (
    <ChartCard title={title}>
      <div className="d-flex align-items-center justify-content-center">
        <ReactApexChart
          options={options}
          series={series}
          type="donut"
          width={width}
          height={height}
        />
      </div>
    </ChartCard>
  );
};

export default DounutCharts;
