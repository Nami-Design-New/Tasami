import { useEffect, useState } from "react";
import CustomButton from "../../ui/CustomButton";
import PageHeader from "../../ui/PageHeader";
import TabsHorizontal from "../../ui/TabsHorizontal";
import AssistantPresenter from "../../ui/dash-board/userprofile/AssistantPresenter";
import Beneficiary from "../../ui/dash-board/userprofile/Beneficiary";
import SuspensionModel from "../../ui/modals/SuspensionModel";
import AddNewTask from "./tasks/AddNewTaskModal";
import { useParams, useSearchParams } from "react-router";
import useGetUserDetails from "../../hooks/dashboard/subscription/useGetUserDetails";
import Loading from "../../ui/loading/Loading";
import { useTranslation } from "react-i18next";

const UserProfile = () => {
  const { t } = useTranslation();
  const [openSuspensionModel, setOpenSuspensionModel] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab");
  const { id } = useParams();
  const { userDetails, isLoading } = useGetUserDetails(id);

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
                  <img
                    src={
                      userDetails?.image ||
                      "https://avatar.iran.liara.run/public/6"
                    }
                  />
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
                <CustomButton
                  size="large"
                  color="secondary"
                  fullWidth
                  onClick={() => setShowTaskModal(true)}
                >
                  {t("dashboard.userProfile.actions.requestStopAccount")}
                </CustomButton>
                <CustomButton
                  size="large"
                  color={
                    userDetails?.status === "stopped" ? "primary" : "secondary"
                  }
                  fullWidth
                  onClick={() => setOpenSuspensionModel(true)}
                >
                  {userDetails?.status === "stopped"
                    ? t("dashboard.userProfile.actions.activateAccount")
                    : t("dashboard.userProfile.actions.stopAccount")}
                </CustomButton>{" "}
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
          <SuspensionModel
            showModal={openSuspensionModel}
            setShowModal={setOpenSuspensionModel}
            isUser={true}
            id={userDetails?.id}
          />{" "}
          <AddNewTask
            showModal={showTaskModal}
            setShowModal={setShowTaskModal}
            title={t("dashboard.userProfile.actions.requestStopAccount")}
          />
        </div>
      )}
    </>
  );
};

export default UserProfile;
