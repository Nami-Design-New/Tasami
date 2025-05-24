import ReactApexChart from "react-apexcharts";
import ChartCard from "./ChartCard";

const UserGrowthChart = () => {
  const series = [
    {
      name: "المستخدمين",
      data: [
        300, 500, 800, 1200, 1100, 1600, 2000, 2300, 2500, 2800, 3100, 3500,
      ],
    },
  ];

  const options = {
    chart: {
      type: "bar",
      height: 350,
      toolbar: { show: true },
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        columnWidth: "10%",
        endingShape: "rounded",
      },
    },
    dataLabels: { enabled: false },
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
    yaxis: {},
    colors: ["#6366f1"],
    tooltip: {
      y: {
        formatter: (val) => `${val} مستخدم`,
      },
    },
  };

  return (
    <ChartCard title={"نمو المستخدمين"}>
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

export default UserGrowthChart;
