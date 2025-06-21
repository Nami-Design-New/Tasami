import { useState } from "react";
import { Link } from "react-router";
import "../../assets/styles/profile.css";
import PageHeader from "../../ui/PageHeader";
import TabsHorizontal from "../../ui/TabsHorizontal";
import AssistantPresenter from "../../ui/dash-board/userprofile/AssistantPresenter";
import Beneficiary from "../../ui/dash-board/userprofile/Beneficiary";
import SuspensionModel from "../../ui/modals/SuspensionModel";
import AddNewTask from "./tasks/AddNewTask";
import CustomLink from "../../ui/CustomLink";
import CustomButton from "../../ui/CustomButton";
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
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };
  return (
    <div className="user-dashboard">
      <PageHeader removeLast={true} name={"بيانات المستخدم"} />
      <div className="row">
        <div className="col-12  col-lg-3 p-1">
          <div className="user-dashboard__profile">
            <div className="user-dashboard__avatar">
              <img src="https://avatar.iran.liara.run/public/6" />
            </div>
            <div className="personal__data">
              <p>
                <span>الاسم:</span>
                <span> محمود </span>
              </p>
              <p>
                <span>رقم الجوال:</span>
                <span> 02220303030 </span>
              </p>
              <p>
                <span> البريد الالكتروني:</span>
                <span> mahmouf@gmail.com </span>
              </p>
              <p>
                <span>تاريخ الميلاد :</span>
                <span> 05-Feb-1992 </span>
              </p>
              <p>
                <span>الجنس:</span>
                <span> ذكر </span>
              </p>
              <p>
                <span>الجنسية:</span>
                <span>السعودية</span>
              </p>
              <p>
                <span> الدولة:</span>
                <span>السعودية </span>
              </p>
              <p>
                <span>المدينة:</span>
                <span>الرياض</span>
              </p>
            </div>
            {/* <Link className="user-dashboard__resume "> السيره الذاتية </Link> */}
          </div>
          <div className="d-flex flex-column gap-2 mt-3">
            <CustomLink to={`/dashboard/chats`} size="large" fullWidth>
              تواصل مع المستخدم
            </CustomLink>
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
          <TabsHorizontal
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={handleTabClick}
          />
          {activeTab === 1 && <Beneficiary />}
          {activeTab === 2 && <AssistantPresenter />}
        </div>
      </div>
      <SuspensionModel
        showModal={openSuspensionModel}
        setShowModal={setOpenSuspensionModel}
      />{" "}
      <AddNewTask showModal={showTaskModal} setShowModal={setShowTaskModal} />
    </div>
  );
};

export default UserProfile;
