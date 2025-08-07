import { useSearchParams } from "react-router";
import QuickActionsCard from "../../ui/dash-board/cards/QuickActionsCard";
import UserProfileCard from "../../ui/dash-board/cards/UserProfileCard";
import EmployeeData from "../../ui/dash-board/EmploymentData/EmployeeData";
import EmployeePermessions from "../../ui/dash-board/EmploymentData/EmployeePermessions";
import EmployeePersonalData from "../../ui/dash-board/EmploymentData/EmployeePersonalData";
import WorkingGroups from "../../ui/dash-board/EmploymentData/WorkingGroups";
import PageHeader from "../../ui/PageHeader";
import TabsHorizontal from "../../ui/TabsHorizontal";

const tabs = [
  {
    id: 1,
    title: "البيانات الوظيفيه",
  },
  {
    id: 2,
    title: "البيانات الشخصية",
  },
  {
    id: 3,
    title: "الصلاحيات",
  },
  {
    id: 4,
    title: " المجموعات المشتركه ",
  },
];

const EmployeeProfile = () => {
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "1";

  return (
    <section className="employee__profile">
      <PageHeader />
      <div className="row g-3">
        <div className="col-12 col-md-4 col-lg-3">
          <div className="right-side">
            <UserProfileCard />
            <QuickActionsCard />
          </div>
        </div>
        <div className="col-12 col-md-8 col-lg-9">
          <TabsHorizontal tabs={tabs} activeTab={activeTab} />
          {activeTab === "1" && <EmployeeData />}
          {activeTab === "2" && <EmployeePersonalData />}
          {activeTab === "3" && <EmployeePermessions />}
          {activeTab === "4" && <WorkingGroups />}
        </div>
      </div>
    </section>
  );
};

export default EmployeeProfile;
