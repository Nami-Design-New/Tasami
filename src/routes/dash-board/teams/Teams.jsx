import LineAnalyticsChart from "../../../ui/dash-board/cards/RevenueAnalyticsCard ";
import ColumnChart from "../../../ui/dash-board/home/ColumnChart";
import DounutCharts from "../../../ui/dash-board/home/EmployersChart";
import { USERS_CATEGORIES } from "../../../utils/constants";

const usersCountSeries = [50, 30, 22];

const usersCountoptions = {
  labels: ["التنفيذيين", "المشرفين", " موظفين خدمه العملاء"],
  chart: {
    type: "donut",
  },
  colors: ["#214b92", "#5fcafa", "#ff4a5f"],
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
            formatter: (w) => w.globals.seriesTotals.reduce((a, b) => a + b, 0),
          },
        },
      },
    },
  },
};

const Teams = () => {
  return (
    <section className="mt-5">
      <div className="row">
        <div className="col-12 col-md-6">
          <DounutCharts
            title={"عدد الموظفين"}
            series={usersCountSeries}
            options={usersCountoptions}
          />
        </div>
        <div className="col-12 col-md-6">{/* <ColumnChart /> */}</div>
        <div className="col-12">{/* <LineAnalyticsChart /> */}</div>
      </div>
    </section>
  );
};

export default Teams;
