import RevenueAnalyticsCard from "../../ui/dash-board/cards/RevenueAnalyticsCard ";
import EmployersChart from "../../ui/dash-board/home/EmployersChart";
import StatCard from "../../ui/dash-board/cards/StatCard";
import TaskStatus from "../../ui/dash-board/home/TaskStatus";
import UserGrowthChart from "../../ui/dash-board/home/UsersGrowthChart";
import UsersTable from "../../ui/dash-board/home/UsersTable";
import ChartCard from "../../ui/dash-board/cards/ChartCard";
import DounutCharts from "../../ui/dash-board/home/EmployersChart";
import LineAnalyticsChart from "../../ui/dash-board/cards/RevenueAnalyticsCard ";
// import ChartCard from "..";

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

const employersSeries = [20, 55, 150];

const employersOptions = {
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
            formatter: (w) => w.globals.seriesTotals.reduce((a, b) => a + b, 0),
          },
        },
      },
    },
  },
};

export default function DashBoardHome() {
  return (
    <section className="dashboard--home">
      <div className="dashboard--home__header">
        <div className="welcome">
          <h3>مرحبًا بك مرة أخرى، محمود عباس !</h3>
          <p>قم بتتبع نشاط المبيعات لديك، والعملاء المحتملين والصفقات هنا.</p>
        </div>
        <div className="actions">
          <button className="button btn-icon">
            {" "}
            <i className="fa-light fa-filter"></i>
            <span>التصفية</span>
          </button>
          <button className="button btn-light btn-icon">
            <i className="fa-light fa-upload"></i>
            <span>تصدير</span>
          </button>
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
            icon={<i className="fa-light fa-users"></i>}
            title=" عدد البرامج "
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
            icon={<i className="fa-light fa-users"></i>}
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
              <button className="quick--action__button">
                <img src="./icons/add-user.svg" /> <span> انشاء موظف </span>{" "}
              </button>
              <button className="quick--action__button">
                <img src="./icons/permisson_icon.svg" />{" "}
                <span> انشاء صلاحيه </span>{" "}
              </button>
              <button className="quick--action__button">
                <img src="./icons/delete-user.svg" /> <span> ايقاف موظف </span>{" "}
              </button>
              <button className="quick--action__button">
                <img src="./icons/add-fileds.svg" />{" "}
                <span> اضافه مجال جديد </span>{" "}
              </button>
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
            />
          </div>
        </div>
        <div className="col-12 col-xl-8">
          <LineAnalyticsChart
            series={series}
            title={"تحليلات الإيرادات"}
            categories={categories}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <UserGrowthChart />
        </div>
        <div className="col-12">
          <UsersTable />
        </div>
      </div>
    </section>
  );
}
