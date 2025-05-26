import ReactApexChart from "react-apexcharts";
import ChartCard from "./ChartCard";

const LineAnalyticsChart = ({ series, title, categories }) => {
  const options = {
    chart: {
      height: 350,
      type: "line",
      toolbar: { show: true },
    },
    stroke: {
      width: [0, 2, 3],
      curve: "smooth",
      dashArray: [0, 5, 0],
    },
    fill: {
      type: ["solid", "solid", "solid"],
      opacity: [0.2, 1, 1],
    },
    markers: {
      size: 0,
    },
    colors: ["#e2e8f0", "#0ea5e9", "#8b5cf6"], // Sales, Revenue, Profit
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories,
    },
    legend: {
      position: "top",
      horizontalAlign: "left",
      markers: { radius: 12 },
    },
    tooltip: {
      shared: true,
      intersect: false,
    },
  };
  return (
    <ChartCard title={title}>
      <p className="subtitle">العائد من الاشتراكات </p>
      <ReactApexChart
        options={options}
        series={series}
        type="line"
        height={350}
      />
    </ChartCard>
  );
};

export default LineAnalyticsChart;
