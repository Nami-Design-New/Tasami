import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import ChartCard from "../../ui/dash-board/cards/ChartCard";
import StatCard from "../../ui/dash-board/cards/StatCard";
import ColumnChart from "../../ui/dash-board/charts/ColumnChart";
import DounutCharts from "../../ui/dash-board/charts/DounutCharts";
import LineAnalyticsChart from "../../ui/dash-board/charts/LineAnalyticsChart";
import TaskStatus from "../../ui/dash-board/home/TaskStatus";
import { useSelector } from "react-redux";
import useGetHomeStatistics from "../../hooks/dashboard/home/useGetHomeStatistics";
import Loading from "../../ui/loading/Loading";
import addUser from "../../assets/icons/add-user.svg";
import permissonIcon from "../../assets/icons/permisson_icon.svg";
import deleteUser from "../../assets/icons/delete-user.svg";
import addFileds from "../../assets/icons/add-fileds.svg";

const packageColors = ["#F5B849", "#26BF94", "#4A90E2", "#9B59B6", "#E74C3C"];
const packageIcons = [
  <i className="fa-solid fa-users"></i>,
  <i className="fa-solid fa-user-group"></i>,
  <i className="fa-solid fa-user-check"></i>,
  <i className="fa-solid fa-user-plus"></i>,
  <i className="fa-solid fa-user-tie"></i>,
];

export default function DashboardHome() {
  const { t } = useTranslation();
  const { user } = useSelector((state) => state.adminAuth);
  const { homeStatistics, isLoading } = useGetHomeStatistics();

  if (isLoading) return <Loading />;

  // ===== Packages chartData (for StatCards) =====
  const packageChartData =
    homeStatistics?.subscriptions_revenue?.map(
      (sub) => sub.total_subscriptions
    ) || [];

  // ===== Revenue Line Chart =====
  const revenueSeries = [
    {
      name: t("dashboard.revenue_12_months"),
      type: "line",
      data: homeStatistics.subscriptions_revenue.map(
        (sub) => sub.yearly_revenue
      ),
    },
    {
      name: t("dashboard.revenue_6_months"),
      type: "line",
      data: homeStatistics.subscriptions_revenue.map(
        (sub) => sub.half_yearly_revenue
      ),
    },
    {
      name: t("dashboard.assistant_requests"),
      type: "area",
      data: homeStatistics.subscriptions_revenue.map(
        (sub) => sub.total_subscriptions
      ),
    },
  ];

  const revenueCategories = homeStatistics.subscriptions_revenue.map(
    (sub) => sub.month
  );

  const revenueOptions = {
    chart: { height: 350, toolbar: { show: true } },
    stroke: { width: [0, 2, 3], curve: "smooth", dashArray: [0, 5, 0] },
    fill: { type: ["solid", "solid", "solid"], opacity: [0.2, 1, 1] },
    markers: { size: 0 },
    colors: ["#e2e8f0", "#0ea5e9", "#8b5cf6"],
    dataLabels: { enabled: false },
    xaxis: { categories: revenueCategories },
    legend: {
      position: "top",
      horizontalAlign: "left",
      markers: { radius: 12 },
    },
    tooltip: { shared: true, intersect: false },
  };

  // ===== User Growth Column Chart =====
  const userGrowthSeries = [
    {
      name: t("dashboard.users"),
      data: homeStatistics.users_growth.monthly_data.map((m) => m.user_count),
    },
  ];
  const userGrowthCategories = homeStatistics.users_growth.monthly_data.map(
    (m) => m.month
  );
  const userGrowthOptions = {
    chart: { type: "bar", height: 350, toolbar: { show: true } },
    plotOptions: {
      bar: { borderRadius: 4, columnWidth: "10%", endingShape: "rounded" },
    },
    dataLabels: { enabled: false },
    xaxis: { categories: userGrowthCategories },
    colors: ["#6366f1"],
    tooltip: { y: { formatter: (val) => `${val} ${t("dashboard.users")}` } },
  };

  // ===== Employees Donut Chart =====
  const employeesSeries = homeStatistics.employees_counts.roles.map(
    (role) => role?.count
  );
  const employeesOptions = {
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
    responsive: [
      {
        breakpoint: 480,
        options: { chart: { width: 200 }, legend: { position: "bottom" } },
      },
    ],
  };

  return (
    <section className="dashboard--home">
      <div className="dashboard--home__header">
        <div className="welcome">
          <h3>
            {user?.first_name} {t("dashboard.welcome_back")}
          </h3>
          <p>{t("dashboard.welcome_message")}</p>
        </div>
      </div>

      <div className="row">
        {/* Help Requests */}
        <div className="col-12 col-lg-6 col-xxl p-2">
          <StatCard
            icon={<i className="fa-solid fa-handshake"></i>}
            title={t("dashboard.assistant_requests")}
            value={homeStatistics?.help_requests?.total_help_requests}
            percentage={homeStatistics?.help_requests?.growth_percentage}
            timeframe={t("dashboard.this_month")}
            chartData={packageChartData}
            color="#805AD5"
          />
        </div>

        {/* Help Offers */}
        <div className="col-12 col-lg-6 col-xxl p-2">
          <StatCard
            icon={<i className="fa-solid fa-notebook"></i>}
            title={t("dashboard.help_offers")}
            value={homeStatistics?.help_services?.total_help_services}
            percentage={homeStatistics?.help_services?.growth_percentage}
            timeframe={t("dashboard.this_month")}
            chartData={packageChartData}
            color="#23B7E5"
          />
        </div>

        {/* Packages */}
        {homeStatistics?.packages_counts.map((myPackage, index) => (
          <div className="col-12 col-lg-6 col-xxl p-2" key={index}>
            <StatCard
              icon={packageIcons[index % packageIcons.length]}
              title={myPackage.package}
              value={myPackage.total_users}
              percentage={myPackage.growth_percentage}
              timeframe={t("dashboard.this_month")}
              chartData={packageChartData}
              color={packageColors[index % packageColors.length]}
            />
          </div>
        ))}

        {/* Quick Actions */}
        <div className="col-12 p-2">
          <ChartCard title={t("dashboard.urgent_actions")}>
            <div className="quick__actions--list">
              <Link
                to="/dashboard/create-employee"
                className="quick--action__button"
              >
                <img src={addUser} alt="" />
                <span>{t("dashboard.create_employee")}</span>
              </Link>
              <Link
                to="/dashboard/list-management/working-groups"
                className="quick--action__button"
              >
                <img src={permissonIcon} alt="" />
                <span>{t("dashboard.create_group")}</span>
              </Link>
              <Link className="quick--action__button">
                <img src={deleteUser} alt="" />
                <span>{t("dashboard.suspend_employee")}</span>
              </Link>
              <Link
                to="/dashboard/list-management/fields-and-specializations"
                className="quick--action__button"
              >
                <img src={addFileds} alt="" />
                <span>{t("dashboard.add_field")}</span>
              </Link>
            </div>
          </ChartCard>
        </div>
      </div>

      <div className="row">
        {/* Task Status + Employees Donut */}
        <div className="col-12 col-xl-4 p-2">
          <div className="col pb-2">
            <TaskStatus tasksData={homeStatistics?.tasks_counts} />
          </div>
          <div className="col pt-2">
            <DounutCharts
              series={employeesSeries}
              options={employeesOptions}
              title={t("dashboard.employees")}
              height={300}
            />
          </div>
        </div>

        {/* Revenue Analytics */}
        <div className="col-12 col-xl-8 p-2">
          <LineAnalyticsChart
            series={revenueSeries}
            title={t("dashboard.revenue_analytics")}
            options={revenueOptions}
            type="line"
            height={550}
          />
        </div>
      </div>

      <div className="row">
        {/* User Growth */}
        <div className="col-12 p-2">
          <ColumnChart
            series={userGrowthSeries}
            options={userGrowthOptions}
            title={t("dashboard.user_growth")}
          />
        </div>
      </div>
    </section>
  );
}
