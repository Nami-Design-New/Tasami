import { useMemo, useState } from "react";
import { useParams, useSearchParams } from "react-router";
import { useTranslation } from "react-i18next";

import CustomButton from "../../ui/CustomButton";
import PageHeader from "../../ui/PageHeader";
import Tabs from "../../ui/Tabs";
import EmployerDataForm from "../../ui/dash-board/create-employee/EmployerDataForm";
import PerformanceIndicators from "../../ui/dash-board/create-employee/PerformanceIndicators";
import PermissionBoard from "../../ui/dash-board/create-employee/PermissionBoard";
import SuspensionModel from "../../ui/modals/SuspensionModel";
import AddNewTask from "./tasks/AddNewTaskModal";
import DraftedUsers from "../../ui/dash-board/create-employee/DraftedUsers";

const CreateEmployee = () => {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [openSuspensionModel, setOpenSuspensionModel] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const isEditMode = !!id;
  console.log(isEditMode);

  const { t } = useTranslation();

  const allTabs = [
    {
      id: 1,
      icon: <i className="fa-regular fa-user"></i>,
      title: t("dashboard.createEmployee.accountData"),
      visibleInMainMode: true,
      visibleInEditMode: true,
    },
    {
      id: 2,
      icon: <i className="fa-regular fa-shield-halved"></i>,
      title: t("dashboard.createEmployee.permissions"),
      visibleInMainMode: false,
      visibleInEditMode: true,
    },
    {
      id: 3,
      icon: <i className="fa-solid fa-chart-waterfall"></i>,
      title: t("dashboard.createEmployee.performanceIndicators"),
      visibleInMainMode: false,
      visibleInEditMode: true,
    },
    {
      id: 4,
      icon: <i className="fa-regular fa-users"></i>,
      title: t("dashboard.createEmployee.drafted"),
      visibleInMainMode: true,
      visibleInEditMode: false,
    },
  ];

  const tabs = useMemo(() => {
    return allTabs.filter((tab) =>
      isEditMode ? tab.visibleInEditMode : tab.visibleInMainMode
    );
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
    3: <PerformanceIndicators />,
    4: <DraftedUsers />,
  };

  return (
    <section>
      <div className="row g-3">
        <PageHeader
          removeLast={isEditMode === true}
          name={
            isEditMode
              ? t("dashboard.createEmployee.employeeAccountDetails")
              : null
          }
        />

        {isEditMode ? (
          <div className="col-12 col-md-3">
            <div className="side-tabs-wrapper">
              <Tabs
                tabs={tabs}
                activeTab={activeTab}
                onTabChange={handleTabClick}
              />

              {!isEditMode && (
                <div className="completion-card">
                  <div className="completion-card__title">
                    {t("dashboard.createEmployee.completionRateTitle")}
                  </div>
                  <div className="completion-card__value">
                    <sup>%</sup>
                    {t("dashboard.createEmployee.completionRateValue")}
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
                      {t("dashboard.createEmployee.requestSuspendAccount")}
                    </CustomButton>

                    <CustomButton
                      color="secondary"
                      size="large"
                      fullWidth
                      onClick={() => setOpenSuspensionModel(true)}
                    >
                      {t("dashboard.createEmployee.suspendAccount")}
                    </CustomButton>
                  </>
                ) : (
                  <CustomButton color="secondary" size="large" fullWidth>
                    {t("dashboard.createEmployee.activateAccount")}
                  </CustomButton>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="col-12 col-md-3">
            <div className="side-tabs-wrapper">
              <Tabs
                tabs={tabs}
                activeTab={activeTab}
                onTabChange={handleTabClick}
              />
            </div>
          </div>
        )}

        <div className={isEditMode ? "col-12 col-md-9" : "col-12 col-md-9 "}>
          {tabComponents[activeTab] || (
            <div>{t("dashboard.createEmployee.contentNotAvailable")}</div>
          )}
        </div>
      </div>

      {/* Modals */}
      <AddNewTask
        showModal={showTaskModal}
        setShowModal={setShowTaskModal}
        title={t("dashboard.createEmployee.requestSuspendAccountModalTitle")}
      />

      <SuspensionModel
        showModal={openSuspensionModel}
        setShowModal={setOpenSuspensionModel}
        id={id}
      />
    </section>
  );
};

export default CreateEmployee;
