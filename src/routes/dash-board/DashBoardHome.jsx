import EmployersChart from "./EmployersChart";
import RevenueAnalyticsCard from "./RevenueAnalyticsCard ";
import StatCard from "./StatCard";
import TaskStatus from "./TaskStatus";
import UserGrowthChart from "./UsersGrowthChart";
import UsersTable from "./UsersTable";

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
        <div className="col-12  col-md-6 col-xxl-3">
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
        <div className="col-12 col-md-6 col-xxl-3">
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
        <div className="col-12 col-md-6 col-xxl-3">
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
        <div className="col-12 col-md-6 col-xxl-3">
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
      </div>
      <div className="row">
        <div className="col-12 col-xl-4">
          <div className="col p-0">
            <TaskStatus />
          </div>

          <div className="col p-0">
            <EmployersChart />
          </div>
        </div>
        <div className="col-12 col-xl-8">
          <RevenueAnalyticsCard />
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

      {/* <div className="row">
        <div className="col-xxl-9 col-xl-12 p-0">
          <div className="row">
            <div className="col-xl-4 ">
              <div className="row">
                <div className="col-xl-12 p-0">
                  <DonutChart />
                </div>
                <div className="p-0 col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                  <TaskStatus />
                </div>
              </div>
            </div>
            <div className="col-xl-8 ">
              <div className="row">
                <div className="p-0 col-xxl-6 col-lg-6 col-md-6">
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
                <div className="p-0 col-xxl-6 col-lg-6 col-md-6">
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
                <div className="p-0 col-xxl-6 col-lg-6 col-md-6">
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
                <div className="p-0 col-xxl-6 col-lg-6 col-md-6">
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
              </div>
              <div className="col-xl-12">
                <RevenueAnalyticsCard />
              </div>
            </div>
          </div>
        </div>
        <div className="col-xxl-3 col-xl-12 p-0">
          <div className="row">
            <div className="col-xxl-12 col-xl-12">
              <div className="row">
                <div className="col-xl-12 col-xl-6">
                  {" "}
                  <EmployersChart />
                </div>
                <div className="col-xl-12 col-xl-6">
                  <UserGrowthChart />
                </div>
                <div className="col-xl-12 col-xl-6">1</div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </section>
  );
}
