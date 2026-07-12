import { useEffect, useState } from "react";
import CustomButton from "../../ui/CustomButton";
import PageHeader from "../../ui/PageHeader";
import TabsHorizontal from "../../ui/TabsHorizontal";
import AssistantPresenter from "../../ui/dash-board/userprofile/AssistantPresenter";
import Beneficiary from "../../ui/dash-board/userprofile/Beneficiary";
import AccountStatusModal from "../../ui/modals/AccountStatusModal";
import AddNewTask from "./tasks/AddNewTaskModal";
import { TASK_SYSTEM_CODES } from "./tasks/taskSystemCodes";
import { useParams, useSearchParams } from "react-router";
import useGetUserDetails from "../../hooks/dashboard/subscription/useGetUserDetails";
import Loading from "../../ui/loading/Loading";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import profilePlaceholder from "../../assets/images/dashboard/avatar-placeholder.jpg";
import useAdminPermissions from "../../hooks/auth/dashboard/useAdminPermissions";
import { DASHBOARD_PERMISSIONS } from "../../utils/dashboardPermissions";

const UserProfile = () => {
  const { t } = useTranslation();
  const { hasPermission } = useAdminPermissions();
  const canCreateTask = hasPermission(DASHBOARD_PERMISSIONS.TASKS_CREATE);
  const canStopUser = hasPermission(DASHBOARD_PERMISSIONS.STOP_USERS);
  const [openAccountStatusModal, setOpenAccountStatusModal] = useState(false);
  const [accountStatusDetails, setAccountStatusDetails] = useState(null);
  const [isOpeningAccountStatus, setIsOpeningAccountStatus] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab");
  const { id } = useParams();
  const { userDetails, isLoading, refetch } = useGetUserDetails(id);

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

  const tabs = [
    {
      id: 1,
      title: t("dashboard.userProfile.tabs.beneficiary"),
    },
    {
      id: 2,
      title: t("dashboard.userProfile.tabs.assistant"),
    },
  ];
  useEffect(() => {
    if (!activeTab) {
      setSearchParams({ tab: "1" }, { replace: true });
    }
  }, [activeTab, setSearchParams]);
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="user-dashboard">
          <PageHeader
            removeLast={true}
            name={t("dashboard.userProfile.header")}
          />
          <div className="row">
            <div className="col-12  col-lg-3 p-1">
              <div className="user-dashboard__profile">
                <div className="user-dashboard__avatar">
                  <img src={userDetails?.image || profilePlaceholder} />
                </div>
                <div className="personal__data">
                  <p>
                    <span>{t("dashboard.userProfile.fields.name")}:</span>
                    <span>
                      {" "}
                      {`${userDetails?.first_name} ${userDetails?.last_name}`}{" "}
                    </span>
                  </p>
                  <p>
                    <span>{t("dashboard.userProfile.fields.phone")}:</span>
                    <span>
                      {" "}
                      {`${userDetails?.phone_code} ${userDetails?.phone}`}{" "}
                    </span>
                  </p>
                  <p>
                    <span>{t("dashboard.userProfile.fields.email")}:</span>
                    <span> {`${userDetails?.email}`} </span>
                  </p>
                  <p>
                    <span>{t("dashboard.userProfile.fields.birthdate")}:</span>
                    <span> {`${userDetails?.birthdate}`} </span>
                  </p>
                  <p>
                    <span>{t("dashboard.userProfile.fields.gender")}:</span>
                    <span> {`${userDetails?.gender}`} </span>
                  </p>
                  <p>
                    <span>
                      {t("dashboard.userProfile.fields.nationality")}:
                    </span>
                    <span> {`${userDetails?.nationality?.title}`} </span>
                  </p>
                  <p>
                    <span>{t("dashboard.userProfile.fields.country")}:</span>
                    <span> {`${userDetails?.country_id.title}`} </span>
                  </p>
                  <p>
                    <span>{t("dashboard.userProfile.fields.city")}:</span>
                    <span> {`${userDetails?.city_id?.title}`} </span>
                  </p>
                </div>
                {/* <Link className="user-dashboard__resume "> السيره الذاتية </Link> */}
              </div>
              <div className="d-flex flex-column gap-2 mt-3">
                {canCreateTask && (
                  <CustomButton
                    size="large"
                    color="secondary"
                    fullWidth
                    onClick={() => setShowTaskModal(true)}
                  >
                    {t("dashboard.userProfile.actions.requestStopAccount")}
                  </CustomButton>
                )}
                <CustomButton
                  size="large"
                  color="primary"
                  fullWidth
                  loading={isOpeningAccountStatus}
                  onClick={handleOpenAccountStatus}
                >
                  {t("dashboard.userProfile.actions.accountStatus")}
                </CustomButton>
              </div>
            </div>
            <div className="col-12 col-lg-9 p-1 ">
              <TabsHorizontal tabs={tabs} activeTab={activeTab} />
              {activeTab === "1" && <Beneficiary userDetails={userDetails} />}
              {activeTab === "2" && (
                <AssistantPresenter userDetails={userDetails} />
              )}
            </div>
          </div>
          {openAccountStatusModal ? (
            <AccountStatusModal
              show
              onHide={handleCloseAccountStatus}
              userDetails={accountStatusDetails}
              canChangeStatus={canStopUser}
            />
          ) : null}
          {canCreateTask && (
            <AddNewTask
              showModal={showTaskModal}
              setShowModal={setShowTaskModal}
              title={t("dashboard.userProfile.actions.requestStopAccount")}
              fixedTaskSystemCode={TASK_SYSTEM_CODES.STOP_ACCOUNT}
            />
          )}
        </div>
      )}
    </>
  );
};

export default UserProfile;
