import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
Chart.register(ArcElement, Tooltip, Legend);
import { Link } from "react-router";

export default function ContractsStatus() {
  const totalContracts = 128;
  const data = {
    labels: ["بانتظار التنفيذ", "قيد التنفيذ", "مكتملة"],
    datasets: [
      {
        data: [30, 25, 45],
        backgroundColor: ["#e97b2c", "#63c5f9", "#20407c"],
        borderWidth: 0,
        cutout: "70%",
      },
    ],
  };

  const options = {
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => `${context.label}: ${context.parsed}%`,
        },
      },
    },
  };

  return (
    <section className="contracts-status container">
          <div className="slider-header">
        <div className="text">
         <h2>اعمالي</h2>
          <p>راجع وتتبع اعمالك بسهولة</p>
        </div>
         <Link to="/my-works" className="view-all">عرض الكل</Link>
      </div>
     
      <div className="content">
        <div className="chart-wrapper">
          <Doughnut data={data} options={options} />
          <div className="center-label">
            <p>الاعمال</p>
            <h3>{totalContracts}</h3>
          </div>
        </div>

        <div className="details">
          <div className="item">
            <span className="dot" style={{ background: "#e97b2c" }}></span>
            بانتظار التنفيذ 30%
          </div>
          <div className="item">
            <span className="dot" style={{ background: "#5fcafa" }}></span>
            قيد التنفيذ 25%
          </div>
          <div className="item">
            <span className="dot" style={{ background: "#214b92" }}></span> 
            مكتملة 45%
          </div>
        </div>
      </div>
    </section>
  );
}
