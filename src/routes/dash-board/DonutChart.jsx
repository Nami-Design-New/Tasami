import ReactApexChart from "react-apexcharts";

const DonutChart = () => {
  const series = [45, 55];

  const options = {
    labels: ["عدد المستفيدين", "عدد المساعدين"],
    chart: {
      type: "donut",
    },
    colors: ["#214b92", "#5fcafa"],
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
          chart: {
            width: 300,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
    plotOptions: {
      pie: {
        donut: {
          size: "80%",
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: "16px",
              offsetY: -10,
            },
            value: {
              show: true,
              fontSize: "20px",
              fontWeight: 600,
              offsetY: 10,
            },
            total: {
              show: true,
              label: "Total",
              fontSize: "16px",
              fontWeight: 500,
              formatter: function (w) {
                return w.globals.seriesTotals.reduce((a, b) => a + b, 0);
              },
            },
          },
        },
      },
    },
  };

  return (
    <div className="card__users">
      <h3 className=""> عدد المستخدمين </h3>
      <ReactApexChart
        options={options}
        series={series}
        type="donut"
        width="100%"
      />
    </div>
  );
};

export default DonutChart;
