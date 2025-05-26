// components/DonutChart.js
import ReactApexChart from "react-apexcharts";
import ChartCard from "../cards/ChartCard";

const DounutCharts = ({ options, series, title }) => {
  return (
    <ChartCard title={title}>
      <div className="d-flex align-items-center justify-content-center">
        <ReactApexChart
          options={options}
          series={series}
          type="donut"
          width={300}
          height={300}
        />
      </div>
    </ChartCard>
  );
};

export default DounutCharts;
