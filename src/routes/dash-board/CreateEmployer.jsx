import { useEffect, useMemo, useState } from "react";
import Tabs from "../../ui/Tabs";
import EmployerDataForm from "../../ui/dash-board/create-employee/EmployerDataForm";
import PermissionBoard from "../../ui/dash-board/create-employee/PermissionBoard";
import WorkGroups from "./teams/WorkGroups";
import { useParams } from "react-router";
import PerformanceIndicators from "../../ui/dash-board/create-employee/PerformanceIndicators";

const CreateEmployee = () => {
  const { id } = useParams();
  const isEditMode = !!id;

  const tabs = useMemo(() => {
    const baseTabs = [
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

    if (isEditMode) {
      baseTabs.push({
        id: 4,
        icon: <i className="fa-solid fa-chart-waterfall"></i>,
        title: "مؤشرات الاداء",
      });
    }

    return baseTabs;
  }, [isEditMode]);
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };
  useEffect(() => {
    if (id) {
      // fetch user data by ID and populate forms if needed
    }
  }, [id]);
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
          {activeTab === 4 && <PerformanceIndicators />}
        </div>
      </div>
    </section>
  );
};

export default CreateEmployee;
