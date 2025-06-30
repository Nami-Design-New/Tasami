import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip } from "chart.js";
Chart.register(ArcElement, Tooltip);

export default function SimpleContractsChart() {
  const totalContracts = 14;
  const completedContracts = 11;
  const activeContracts = 3;

  const data = {
    labels: ["مكتملة", "نشطة"],
    datasets: [
      {
        data: [completedContracts, activeContracts],
        backgroundColor: ["#20407c", "#63c5f9"],
        borderWidth: 0,
        cutout: "75%",
      },
    ],
  };

  const options = {
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) =>
            `${context.label}: ${context.parsed} عقد`,
        },
      },
    },
  };

  return (
    <div className="contracts-summary-chart">
      <div className="chart-wrapper">
        <Doughnut data={data} options={options} />
        <div className="center-number"> <span className="centered"> كل العقود </span>{totalContracts} </div>
      </div>

      <div className="contracts-summary mt-3">
        <div>
          <span className="dot completed"></span> عقود مكتملة {completedContracts}
        </div>
        <div>
          <span className="dot active"></span> عقود نشطة {activeContracts}
        </div>
      </div>
    </div>
  );
}
