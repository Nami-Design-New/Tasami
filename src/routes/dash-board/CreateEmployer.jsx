import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams, useSearchParams } from "react-router";
import { toast } from "sonner";

import useCreateChatRoom from "../../hooks/dashboard/chats/useCreateChatRoom";
import CustomButton from "../../ui/CustomButton";
import PageHeader from "../../ui/PageHeader";
import Tabs from "../../ui/Tabs";
import DraftedUsers from "../../ui/dash-board/create-employee/DraftedUsers";
import EmployeePasswordTab from "../../ui/dash-board/create-employee/EmployeePasswordTab";
import EmployerDataForm from "../../ui/dash-board/create-employee/EmployerDataForm";
import PerformanceIndicators from "../../ui/dash-board/create-employee/PerformanceIndicators";
import PermissionBoard from "../../ui/dash-board/create-employee/PermissionBoard";
import AccountStatusModal from "../../ui/modals/AccountStatusModal";
import AddNewTask from "./tasks/AddNewTaskModal";
import { TASK_SYSTEM_CODES } from "./tasks/taskSystemCodes";
import { setChat } from "../../redux/slices/chatSlice";
import useAdminPermissions from "../../hooks/auth/dashboard/useAdminPermissions";
import useGetEmployee from "../../hooks/dashboard/employee/useGetEmployee";
import { DASHBOARD_PERMISSIONS } from "../../utils/dashboardPermissions";

const CreateEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [openAccountStatusModal, setOpenAccountStatusModal] = useState(false);
  const [accountStatusDetails, setAccountStatusDetails] = useState(null);
  const [isOpeningAccountStatus, setIsOpeningAccountStatus] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const isEditMode = !!id;

  const { t } = useTranslation();
  const { hasPermission } = useAdminPermissions();
  const canCreateTask = hasPermission(DASHBOARD_PERMISSIONS.TASKS_CREATE);
  const canStopEmployee = hasPermission(DASHBOARD_PERMISSIONS.STOP_EMPLOYEE);
  const canViewPermissions = hasPermission(DASHBOARD_PERMISSIONS.PERMISSIONS);
  const { employee, refetch } = useGetEmployee();

  const handleOpenAccountStatus = async () => {
    setIsOpeningAccountStatus(true);
    try {
      const result = await refetch({ throwOnError: true });
      const freshDetails = result.data?.data;
      if (!freshDetails) throw new Error("Unable to load account status");

      setAccountStatusDetails(freshDetails);
      setOpenAccountStatusModal(true);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsOpeningAccountStatus(false);
    }
  };

  const handleCloseAccountStatus = () => {
    setOpenAccountStatusModal(false);
    setAccountStatusDetails(null);
  };

  const { createChatRoom } = useCreateChatRoom();

  const allTabs = useMemo(
    () => [
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
        permission: DASHBOARD_PERMISSIONS.PERMISSIONS,
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
      {
        id: 5,
        icon: <i className="fa-solid fa-key"></i>,
        title: t("dashboard.employeeProfile.quickActions.changePassword"),
        visibleInMainMode: false,
        visibleInEditMode: true,
      },
    ],
    [t]
  );

  const tabs = useMemo(() => {
    return allTabs.filter((tab) => {
      const isVisibleInMode = isEditMode
        ? tab.visibleInEditMode
        : tab.visibleInMainMode;

      return isVisibleInMode && (!tab.permission || canViewPermissions);
    });
  }, [allTabs, canViewPermissions, isEditMode]);

  const [activeTab, setActiveTab] = useState(() => {
    const tabParam = searchParams.get("tab");
    return tabParam ? parseInt(tabParam) : tabs[0]?.id;
  });

  useEffect(() => {
    const tabParam = searchParams.get("tab");
    const nextTab = tabParam ? parseInt(tabParam) : tabs[0]?.id;

    if (tabs.some((tab) => tab.id === nextTab)) {
      setActiveTab(nextTab);
    } else if (tabs[0]?.id) {
      setActiveTab(tabs[0].id);
      setSearchParams({ tab: tabs[0].id.toString() }, { replace: true });
    }
  }, [searchParams, setSearchParams, tabs]);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    setSearchParams({ tab: tabId.toString() });
  };

  const handleCreateChatRoom = () => {
    createChatRoom(
      { chater_id: id, chater_type: "employee" },
      {
        onSuccess: (res) => {
          setChat(res.data);
          localStorage.setItem("chatId", res.data.id);
          navigate(`/dashboard/chats?chaterId=${id}&chatId=${res?.data?.id}`);
        },
        onError: () => {},
      }
    );
  };

  const tabComponents = {
    1: <EmployerDataForm isEdit={isEditMode} />,
    2: <PermissionBoard />,
    3: <PerformanceIndicators />,
    4: <DraftedUsers />,
    5: <EmployeePasswordTab />,
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
                      onClick={handleCreateChatRoom}
                      size="large"
                      fullWidth
                    >
                      {t("dashboard.createEmployee.contact")}
                    </CustomButton>
                    {canCreateTask && (
                      <CustomButton
                        color="primary"
                        size="large"
                        fullWidth
                        onClick={() => setShowTaskModal(true)}
                      >
                        {t("dashboard.createEmployee.requestSuspendAccount")}
                      </CustomButton>
                    )}
                    <CustomButton
                      color="secondary"
                      size="large"
                      fullWidth
                      disabled={!employee?.data || isOpeningAccountStatus}
                      loading={isOpeningAccountStatus}
                      onClick={handleOpenAccountStatus}
                    >
                      {t("dashboard.userProfile.actions.accountStatus")}
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
      {canCreateTask && (
        <AddNewTask
          showModal={showTaskModal}
          setShowModal={setShowTaskModal}
          title={t("dashboard.createEmployee.requestSuspendAccountModalTitle")}
          fixedTaskSystemCode={TASK_SYSTEM_CODES.STOP_ACCOUNT}
        />
      )}

      {isEditMode && openAccountStatusModal ? (
        <AccountStatusModal
          show
          onHide={handleCloseAccountStatus}
          userDetails={accountStatusDetails}
          canChangeStatus={canStopEmployee}
          isUser={false}
        />
      ) : null}
    </section>
  );
};

export default CreateEmployee;
