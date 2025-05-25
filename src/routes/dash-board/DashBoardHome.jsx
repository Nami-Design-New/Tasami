import RevenueAnalyticsCard from "../../ui/dash-board/cards/RevenueAnalyticsCard ";
import EmployersChart from "../../ui/dash-board/home/EmployersChart";
import StatCard from "../../ui/dash-board/cards/StatCard";
import TaskStatus from "../../ui/dash-board/home/TaskStatus";
import UserGrowthChart from "../../ui/dash-board/home/UsersGrowthChart";
import UsersTable from "../../ui/dash-board/home/UsersTable";
import ChartCard from "../../ui/dash-board/cards/ChartCard";
// import ChartCard from "..";
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
              <button className="action__button">
                <img src="./icons/add-user.svg" /> <span> انشاء موظف </span>{" "}
              </button>
              <button className="action__button">
                <img src="./icons/permisson_icon.svg" />{" "}
                <span> انشاء صلاحيه </span>{" "}
              </button>
              <button className="action__button">
                <img src="./icons/delete-user.svg" /> <span> ايقاف موظف </span>{" "}
              </button>
              <button className="action__button">
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
    </section>
  );
}
