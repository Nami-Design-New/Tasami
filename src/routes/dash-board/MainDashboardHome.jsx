import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import ChartCard from "../../ui/dash-board/cards/ChartCard";
import StatCard from "../../ui/dash-board/cards/StatCard";
import ColumnChart from "../../ui/dash-board/charts/ColumnChart";
import DounutCharts from "../../ui/dash-board/charts/DounutCharts";
import LineAnalyticsChart from "../../ui/dash-board/charts/LineAnalyticsChart";
import TaskStatus from "../../ui/dash-board/home/TaskStatus";
import { useSelector } from "react-redux";

export default function DashboardHome() {
  const { t } = useTranslation();
  const { user } = useSelector((state) => state.adminAuth);

  // ===== Line chart =====
  const series = [
    {
      name: t("dashboard.assistant_requests"),
      type: "area",
      data: [200, 400, 300, 500, 300, 500, 600, 700, 300, 200, 150, 400],
    },
    {
      name: t("dashboard.revenue_6_months"),
      type: "line",
      data: [
        1200, 1000, 1700, 2000, 1500, 3000, 2300, 2500, 2400, 2600, 2700, 2800,
      ],
    },
    {
      name: t("dashboard.revenue_12_months"),
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
    chart: { height: 350, toolbar: { show: true } },
    stroke: { width: [0, 2, 3], curve: "smooth", dashArray: [0, 5, 0] },
    fill: { type: ["solid", "solid", "solid"], opacity: [0.2, 1, 1] },
    markers: { size: 0 },
    colors: ["#e2e8f0", "#0ea5e9", "#8b5cf6"],
    dataLabels: { enabled: false },
    xaxis: { categories },
    legend: {
      position: "top",
      horizontalAlign: "left",
      markers: { radius: 12 },
    },
    tooltip: { shared: true, intersect: false },
  };

  // ===== Donut chart =====
  const employersSeries = [20, 30, 40, 100, 400];
  const employersOptions = {
    labels: [
      t("dashboard.executives"),
      t("dashboard.leaders"),
      t("dashboard.managers"),
      t("dashboard.supervisors"),
      t("dashboard.workers"),
    ],
    chart: { type: "donut" },
    colors: ["#214b92", "#8c137e", "#007d7e", "#f0ad4e", "#adb5bd"],
    legend: { position: "bottom", fontSize: "14px" },
    dataLabels: {
      enabled: true,
      position: "outside",
      style: { fontSize: "14px", fontWeight: "400", colors: ["#fff"] },
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
            value: { show: true, fontSize: "20px", fontWeight: 600 },
            total: {
              show: true,
              label: t("dashboard.total"),
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

  // ===== User growth chart =====
  const userGrowthSeries = [
    {
      name: t("dashboard.users"),
      data: [
        300, 500, 800, 1200, 1100, 1600, 2000, 2300, 2500, 2800, 3100, 3500,
      ],
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
    chart: { type: "bar", height: 350, toolbar: { show: true } },
    plotOptions: {
      bar: { borderRadius: 4, columnWidth: "10%", endingShape: "rounded" },
    },
    dataLabels: { enabled: false },
    xaxis: { categories: userGrowthCategories },
    colors: ["#6366f1"],
    tooltip: {
      y: {
        formatter: (val) => `${val} ${t("dashboard.users")}`,
      },
    },
  };

  return (
    <section className="dashboard--home">
      <div className="dashboard--home__header">
        <div className="welcome">
          <h3>
            {" "}
            {user?.first_name} {t("dashboard.welcome_back")}
          </h3>
          <p>{t("dashboard.welcome_message")}</p>
        </div>
      </div>
      <div className="row">
        <div className="col-12  col-lg-6 col-xxl p-2  ">
          <StatCard
            icon={<i className="fa-solid fa-handshake"></i>}
            title={t("dashboard.assistant_requests")}
            value="1,02,890"
            percentage="40"
            timeframe={t("dashboard.this_month")}
            chartData={[12, 20, 18, 25, 22, 30, 28]}
            color="#805AD5"
          />
        </div>
        <div className="col-12 col-lg-6  col-xxl p-2 ">
          {" "}
          <StatCard
            icon={<i className="fa-solid fa-notebook"></i>}
            title={t("dashboard.help_offers")}
            value="1,02,890"
            percentage="32"
            timeframe={t("dashboard.this_month")}
            chartData={[12, 20, 18, 25, 50, 30, 28]}
            color="#23B7E5"
          />
        </div>
        <div className="col-12 col-lg-6 col-xxl p-2">
          {" "}
          <StatCard
            icon={<i className="fa-solid fa-users"></i>}
            title={t("dashboard.basic_accounts")}
            value="1,02,890"
            percentage="19"
            timeframe={t("dashboard.this_month")}
            chartData={[12, 20, 18, 25, 22, 30, 28]}
            color="#F5B849"
          />
        </div>
        <div className="col-12 col-lg-6 col-xxl p-2">
          <StatCard
            icon={<i className="fa-solid fa-users-medical"></i>}
            title={t("dashboard.leader_accounts")}
            value="1,02,890"
            percentage="-12"
            timeframe={t("dashboard.this_month")}
            chartData={[12, 20, 18, 25, 22, 30, 28]}
            color="#26BF94"
          />
        </div>
        <div className="col-12 col-lg-6 col-xxl p-2">
          <StatCard
            icon={<i className="fa-solid fa-users-medical"></i>}
            title={t("dashboard.pioneer_accounts")}
            value="1,02,890"
            percentage="-12"
            timeframe={t("dashboard.this_month")}
            chartData={[12, 20, 18, 25, 22, 30, 28]}
            color="#26BF94"
          />
        </div>
        <div className="col-12 p-2">
          <ChartCard title={t("dashboard.urgent_actions")}>
            <div className="quick__actions--list">
              <Link
                to="/dashboard/create-employee"
                className="quick--action__button"
              >
                <img src="./icons/add-user.svg" />
                <span>{t("dashboard.create_employee")}</span>
              </Link>
              <Link
                to={"/dashboard/list-management/working-groups"}
                className="quick--action__button"
              >
                <img src="./icons/permisson_icon.svg" />
                <span>{t("dashboard.create_group")}</span>
              </Link>
              <Link className="quick--action__button">
                <img src="./icons/delete-user.svg" />
                <span>{t("dashboard.suspend_employee")}</span>
              </Link>
              <Link
                to="/dashboard/list-management/fields-and-specializations"
                className="quick--action__button"
              >
                <img src="./icons/add-fileds.svg" />
                <span>{t("dashboard.add_field")}</span>
              </Link>
            </div>
          </ChartCard>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-xl-4 p-2">
          <div className="col pb-2">
            <TaskStatus />
          </div>

          <div className="col pt-2">
            <DounutCharts
              series={employersSeries}
              options={employersOptions}
              title={t("dashboard.employees")}
              height={300}
            />
          </div>
        </div>
        <div className="col-12 col-xl-8 p-2">
          <LineAnalyticsChart
            series={series}
            title={t("dashboard.revenue_analytics")}
            options={revnueAnalyticsOptions}
            type="line"
            height={550}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-12 p-2">
          <ColumnChart
            series={userGrowthSeries}
            options={userGrowthOptions}
            title={t("dashboard.user_growth")}
          />
        </div>
        {/* <div className="col-12 p-2">
          <UsersTable />
        </div> */}
      </div>
    </section>
  );
}
