import { useState } from "react";
import "../../assets/styles/profile.css";
import QuickActionsCard from "../../ui/dash-board/cards/QuickActionsCard";
import UserProfileCard from "../../ui/dash-board/cards/UserProfileCard";
import EmployeeData from "../../ui/dash-board/EmploymentData/EmployeeData";
import PageHeader from "../../ui/PageHeader";
import TabsHorizontal from "../../ui/TabsHorizontal";
import EmployeePersonalData from "../../ui/dash-board/EmploymentData/EmployeePersonalData";
import EmployeePermessions from "../../ui/dash-board/EmploymentData/EmployeePermessions";

const tabs = [
  {
    id: 1,
    title: "البيانات الوظيفيه",
  },
  {
    id: 2,
    title: "بيانات الحساب الشخصيه",
  },
  {
    id: 3,
    title: "الصلاحيات",
  },
];

const EmployeeProfile = () => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };
  return (
    <section className="employee__profile">
      <PageHeader />
      <div className="row g-3">
        <div className="col-12 col-md-3">
          <div className="right-side">
            <UserProfileCard />
            <QuickActionsCard />
          </div>
        </div>
        <div className="col-12 col-md-9">
          <TabsHorizontal
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={handleTabClick}
          />
          {activeTab === 1 && <EmployeeData />}
          {activeTab === 2 && <EmployeePersonalData />}
          {activeTab === 3 && <EmployeePermessions />}
        </div>
      </div>
    </section>
  );
};

export default EmployeeProfile;
