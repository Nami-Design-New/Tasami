import { useState } from "react";
import Tabs from "../../ui/Tabs";
import EmployerDataForm from "../../ui/dash-board/create-employer/EmployerDataForm";
import PermissionBoard from "../../ui/dash-board/create-employer/PermissionBoard";
import WorkGroups from "./teams/WorkGroups";

const tabs = [
  {
    id: 1,
    icon: <i className="fa-regular fa-user"></i>,
    title: "بيانات الحساب",
  },
  {
    id: 2,
    icon: <i className="fa-regular fa-shield-halved"></i>,
    title: "الصلاحيات",
  },
  {
    id: 3,
    icon: <i className="fa-regular fa-users"></i>,
    title: "المجموعات التابعه",
  },
];

const CreateEmployer = () => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <section>
      <div className="row g-3">
        <div className="col-12 col-md-3 position-sticky">
          <Tabs
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={handleTabClick}
          />
        </div>
        <div className="col-12 col-md-9 ">
          {activeTab === 1 && <EmployerDataForm />}
          {activeTab === 2 && <PermissionBoard />}
          {activeTab === 3 && <WorkGroups />}
        </div>
      </div>
    </section>
  );
};

export default CreateEmployer;
