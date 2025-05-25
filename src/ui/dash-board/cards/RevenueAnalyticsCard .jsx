import ReactApexChart from "react-apexcharts";
import ChartCard from "./ChartCard";

const RevenueAnalyticsCard = () => {
  const series = [
    {
      name: "الاشتراكات",
      type: "area",
      data: [200, 400, 300, 500, 300, 500, 600, 700, 300, 200, 150, 400],
    },
    {
      name: "عائد باقة 6 أشهر",
      type: "line",
      data: [
        1200, 1000, 1700, 2000, 1500, 3000, 2300, 2500, 2400, 2600, 2700, 2800,
      ],
    },
    {
      name: "عائد باقة 12 شهر",
      type: "line",
      data: [
        900, 2200, 2500, 7000, 3000, 4000, 1000, 3500, 3700, 3900, 4100, 4300,
      ],
    },
  ];

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
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
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
    <ChartCard title="تحليلات الإيرادات">
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

export default RevenueAnalyticsCard;
