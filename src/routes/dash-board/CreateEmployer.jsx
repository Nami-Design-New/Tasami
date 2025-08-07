import { useMemo, useState } from "react";
import { useParams, useSearchParams } from "react-router";
import PageHeader from "../../ui/PageHeader";
import Tabs from "../../ui/Tabs";
import EmployerDataForm from "../../ui/dash-board/create-employee/EmployerDataForm";
import PerformanceIndicators from "../../ui/dash-board/create-employee/PerformanceIndicators";
import PermissionBoard from "../../ui/dash-board/create-employee/PermissionBoard";
import WorkGroups from "./teams/WorkGroups";
import AddNewTask from "./tasks/AddNewTask";
import SuspensionModel from "../../ui/modals/SuspensionModel";
import CustomButton from "../../ui/CustomButton";

const CreateEmployee = () => {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [openSuspensionModel, setOpenSuspensionModel] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const isEditMode = !!id;

  const allTabs = [
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
      title: "المجموعات المشتركه",
    },
    {
      id: 4,
      icon: <i className="fa-solid fa-chart-waterfall"></i>,
      title: "مؤشرات الاداء",
      visibleInEditMode: true,
    },
  ];

  const tabs = useMemo(() => {
    return allTabs.filter((tab) => {
      return !tab.visibleInEditMode || isEditMode;
    });
  }, [isEditMode]);

  const [activeTab, setActiveTab] = useState(() => {
    const tabParam = searchParams.get("tab");
    return tabParam ? parseInt(tabParam) : tabs[0]?.id;
  });

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    setSearchParams({ tab: tabId.toString() });
  };

  const tabComponents = {
    1: <EmployerDataForm isEdit={isEditMode} />,
    2: <PermissionBoard isEdit={isEditMode} />,
    3: <WorkGroups />,
    4: <PerformanceIndicators />,
    // 5: <DataUpdateRequest />,
  };

  return (
    <section>
      <div className="row g-3">
        <PageHeader
          removeLast={isEditMode === true}
          name={isEditMode === true ? " تفاصيل حساب الموظف" : null}
        />
        <div className="col-12 col-md-3 ">
          <div className="side-tabs-wrapper">
            <Tabs
              tabs={tabs}
              activeTab={activeTab}
              onTabChange={handleTabClick}
            />
            {!isEditMode && (
              <div className="completion-card">
                <div className="completion-card__title">
                  نسبة إكمال بيانات حساب الموظف:
                </div>
                <div className="completion-card__value">
                  <sup>%</sup>55
                </div>
              </div>
            )}

            <div className="submit-actions">
              {isEditMode ? (
                <>
                  <CustomButton
                    color="primary"
                    size="large"
                    fullWidth
                    onClick={() => setShowTaskModal(true)}
                  >
                    طلب ايقاف الحساب
                  </CustomButton>
                  <CustomButton
                    color="secondary"
                    size="large"
                    fullWidth
                    onClick={() => setOpenSuspensionModel(true)}
                  >
                    ايقاف الحساب
                  </CustomButton>
                </>
              ) : (
                <CustomButton color="secondary" size="large" fullWidth>
                  تنشيط الحساب
                </CustomButton>
              )}
            </div>
          </div>
        </div>
        <div className="col-12 col-md-9">
          {tabComponents[activeTab] || (
            <div> المحتوى غير متوفر لهذا التبويب</div>
          )}
        </div>
      </div>
      <AddNewTask
        showModal={showTaskModal}
        setShowModal={setShowTaskModal}
        title="طلب ايقاف الحساب"
      />
      <SuspensionModel
        showModal={openSuspensionModel}
        setShowModal={setOpenSuspensionModel}
      />{" "}
    </section>
  );
};

export default CreateEmployee;
