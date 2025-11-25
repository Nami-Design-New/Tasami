import { useState } from "react";
import CustomButton from "../../ui/CustomButton";
import CustomLink from "../../ui/CustomLink";
import PageHeader from "../../ui/PageHeader";
import TabsHorizontal from "../../ui/TabsHorizontal";
import AssistantPresenter from "../../ui/dash-board/userprofile/AssistantPresenter";
import Beneficiary from "../../ui/dash-board/userprofile/Beneficiary";
import SuspensionModel from "../../ui/modals/SuspensionModel";
import AddNewTask from "./tasks/AddNewTaskModal";
import { useParams, useSearchParams } from "react-router";
import useGetUserDetails from "../../hooks/dashboard/subscription/useGetUserDetails";
const tabs = [
  {
    id: 1,
    title: " المستفيد ",
  },
  {
    id: 2,
    title: " المساعد ",
  },
];
const UserProfile = () => {
  const [openSuspensionModel, setOpenSuspensionModel] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get("tab");
  const { id } = useParams();
  const { userDetails, isLoading } = useGetUserDetails(id);
  // console.log("idddd", id, userDetails);
  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="user-dashboard">
          <PageHeader removeLast={true} name={"بيانات المستخدم"} />
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
                    <span>الاسم:</span>
                    <span>
                      {" "}
                      {`${userDetails?.first_name} ${userDetails?.last_name}`}{" "}
                    </span>
                  </p>
                  <p>
                    <span>رقم الجوال:</span>
                    <span>
                      {" "}
                      {`${userDetails?.phone_code} ${userDetails?.phone}`}{" "}
                    </span>
                  </p>
                  <p>
                    <span> البريد الالكتروني:</span>
                    <span> {`${userDetails?.email}`} </span>
                  </p>
                  <p>
                    <span>تاريخ الميلاد :</span>
                    <span> {`${userDetails?.birthdate}`} </span>
                  </p>
                  <p>
                    <span>الجنس:</span>
                    <span> {`${userDetails?.gender}`} </span>
                  </p>
                  <p>
                    <span>الجنسية:</span>
                    <span> {`${userDetails?.nationality?.title}`} </span>
                  </p>
                  <p>
                    <span> الدولة:</span>
                    <span> {`${userDetails?.country_id.title}`} </span>
                  </p>
                  <p>
                    <span>المدينة:</span>
                    <span> {`${userDetails?.city_id.title}`} </span>
                  </p>
                </div>
                {/* <Link className="user-dashboard__resume "> السيره الذاتية </Link> */}
              </div>
              <div className="d-flex flex-column gap-2 mt-3">
                {/* <CustomLink to={`/dashboard/chats`} size="large" fullWidth>
                  تواصل مع المستخدم
                </CustomLink> */}
                <CustomButton
                  size="large"
                  color="secondary"
                  fullWidth
                  onClick={() => setShowTaskModal(true)}
                >
                  طلب إيقاف الحساب
                </CustomButton>
                <CustomButton
                  size="large"
                  color="secondary"
                  fullWidth
                  onClick={() => setOpenSuspensionModel(true)}
                >
                  إيقاف الحساب
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
          />{" "}
          <AddNewTask
            showModal={showTaskModal}
            setShowModal={setShowTaskModal}
            title="طلب إيقاف الحساب"
          />
        </div>
      )}
    </>
  );
};

export default UserProfile;
