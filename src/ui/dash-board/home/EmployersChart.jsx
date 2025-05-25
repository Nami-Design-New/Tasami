// components/DonutChart.js
import ReactApexChart from "react-apexcharts";
import ChartCard from "../cards/ChartCard";

const EmployersChart = () => {
  const series = [20, 55, 150];

  const options = {
    labels: ["عدد التنفيذيين", "عدد المشرفين", "عدد الموظفين "],
    chart: {
      type: "donut",
    },
    colors: ["#214b92", "#5fcafa", "#5f4aff"],
    legend: {
      position: "bottom",
      fontSize: "14px",
    },
    dataLabels: {
      style: {
        fontSize: "14px",
        fontWeight: "400",
        colors: ["#000"],
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: { width: 200 },
          legend: { position: "bottom" },
        },
      },
    ],
    plotOptions: {
      pie: {
        donut: {
          size: "80%",
          labels: {
            show: true,
            name: { show: true, fontSize: "16px", offsetY: -10 },
            value: {
              show: true,
              fontSize: "20px",
              fontWeight: 600,
              offsetY: 10,
            },
            total: {
              show: true,
              label: "الكلي",
              fontSize: "16px",
              fontWeight: 500,
              formatter: (w) =>
                w.globals.seriesTotals.reduce((a, b) => a + b, 0),
            },
          },
        },
      },
    },
  };

  return (
    <ChartCard title={"عدد الموظفين"}>
      <div className="d-flex align-items-center justify-content-center">
        <ReactApexChart
          options={options}
          series={series}
          type="donut"
          width={300} // 👈 Controls full chart width
          height={300} // 👈 Controls full chart height
        />
      </div>
    </ChartCard>
  );
};

export default EmployersChart;
