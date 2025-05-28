import Chart from "react-apexcharts";
import ChartCard from "../cards/ChartCard";

const RadarChart = ({ options, series, height, title }) => {
  return (
    <ChartCard title={title}>
      <Chart options={options} series={series} type="radar" height={height} />
    </ChartCard>
  );
};

export default RadarChart;
