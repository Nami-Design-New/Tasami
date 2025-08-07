import { Link } from "react-router";
import ChartCard from "../../ui/dash-board/cards/ChartCard";
import StatCard from "../../ui/dash-board/cards/StatCard";
import ColumnChart from "../../ui/dash-board/charts/ColumnChart";
import DounutCharts from "../../ui/dash-board/charts/DounutCharts";
import LineAnalyticsChart from "../../ui/dash-board/charts/LineAnalyticsChart";
import TaskStatus from "../../ui/dash-board/home/TaskStatus";
import UsersTable from "../../ui/dash-board/home/UsersTable";

// Line chart
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
const categories = [
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
];
const revnueAnalyticsOptions = {
  chart: {
    height: 350,

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
  colors: ["#e2e8f0", "#0ea5e9", "#8b5cf6"],
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

// Dounut Charts
const employersSeries = [20, 30, 40, 100, 400];
const employersOptions = {
  labels: ["التنفيذيين", "القادة", "المدراء", "المشرفين", "الموظفين"],
  chart: {
    type: "donut",
  },
  colors: ["#214b92", "#8c137e", "#007d7e", "#f0ad4e", "#adb5bd"],
  legend: {
    position: "bottom",
    fontSize: "14px",
  },
  dataLabels: {
    enabled: true,
    position: "outside",
    style: {
      fontSize: "14px",
      fontWeight: "400",
      colors: ["#fff"],
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
            // offsetY: 10,
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

const userGrowthSeries = [
  {
    name: "المستخدمين",
    data: [300, 500, 800, 1200, 1100, 1600, 2000, 2300, 2500, 2800, 3100, 3500],
  },
];
const userGrowthCategories = [
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
];
const userGrowthOptions = {
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
    categories: userGrowthCategories,
  },
  yaxis: {},
  colors: ["#6366f1"],
  tooltip: {
    y: {
      formatter: (val) => `${val} مستخدم`,
    },
  },
};

export default function DashboardHome() {
  return (
    <section className="dashboard--home">
      <div className="dashboard--home__header">
        <div className="welcome">
          <h3>مرحبًا بك مرة أخرى، محمود عباس !</h3>
          <p>قم بتتبع نشاط المبيعات لديك، والعملاء المحتملين والصفقات هنا.</p>
        </div>
      </div>
      <div className="row">
        <div className="col-12  col-lg-6 col-xxl-3 p-2  ">
          <StatCard
            icon={<i className="fa-solid fa-handshake"></i>}
            title="عدد طلبات المساعد"
            value="1,02,890"
            percentage="40"
            timeframe="هذا الشهر"
            chartData={[12, 20, 18, 25, 22, 30, 28]}
            color="#805AD5"
          />
        </div>
        <div className="col-12 col-lg-6  col-xxl-3 p-2 ">
          {" "}
          <StatCard
            icon={<i className="fa-solid fa-notebook"></i>}
            title=" عدد عروض المساعدة "
            value="1,02,890"
            percentage="32"
            timeframe="هذا الشهر"
            chartData={[12, 20, 18, 25, 50, 30, 28]}
            color="#23B7E5"
          />
        </div>
        <div className="col-12 col-lg-6 col-xxl-3 p-2">
          {" "}
          <StatCard
            icon={<i className="fa-solid fa-users"></i>}
            title="عدد  الحسابات الاساسيه"
            value="1,02,890"
            percentage="19"
            timeframe="هذا الشهر"
            chartData={[12, 20, 18, 25, 22, 30, 28]}
            color="#F5B849"
          />
        </div>
        <div className="col-12 col-lg-6 col-xxl-3 p-2">
          {" "}
          <StatCard
            icon={<i className="fa-solid fa-users-medical"></i>}
            title=" عدد الحسابات المميزه "
            value="1,02,890"
            percentage="-12"
            timeframe="هذا الشهر"
            chartData={[12, 20, 18, 25, 22, 30, 28]}
            color="#26BF94"
          />
        </div>
        <div className="col-12 pt-2">
          <ChartCard title={" اجراءات عاجله  "}>
            <div className="quick__actions--list">
              <Link
                to="/dashboard/create-employee"
                className="quick--action__button"
              >
                <img src="./icons/add-user.svg" /> <span> انشاء موظف </span>
              </Link>
              <Link
                to={"/dashboard/list-management/working-groups"}
                className="quick--action__button"
              >
                <img src="./icons/permisson_icon.svg" />
                <span> انشاء مجموعه </span>
              </Link>
              <Link className="quick--action__button">
                <img src="./icons/delete-user.svg" /> <span> ايقاف موظف </span>
              </Link>
              <Link
                to="/dashboard/list-management/fields-and-specializations"
                className="quick--action__button"
              >
                <img src="./icons/add-fileds.svg" />
                <span> اضافه مجال جديد </span>
              </Link>
            </div>
          </ChartCard>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-xl-4">
          <div className="col p-0">
            <TaskStatus />
          </div>

          <div className="col p-0">
            <DounutCharts
              series={employersSeries}
              options={employersOptions}
              title={"عدد الموظفين"}
              height={300}
            />
          </div>
        </div>
        <div className="col-12 col-xl-8">
          <LineAnalyticsChart
            series={series}
            title={"تحليلات الإيرادات"}
            options={revnueAnalyticsOptions}
            type="line"
            height={580}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <ColumnChart
            series={userGrowthSeries}
            options={userGrowthOptions}
            title={"نمو المستخدمين"}
          />
        </div>
        <div className="col-12">
          <UsersTable />
        </div>
      </div>
    </section>
  );
}
