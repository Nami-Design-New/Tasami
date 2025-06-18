import { Link } from "react-router";
import "../../assets/styles/profile.css";
import InfoCard from "../../ui/dash-board/cards/InfoCard";
import PageHeader from "../../ui/PageHeader";
import Rating from "../../ui/dash-board/cards/Rating";
import SuspensionModel from "../../ui/modals/SuspensionModel";
import { useState } from "react";
import TabsHorizontal from "../../ui/TabsHorizontal";
import Beneficiary from "../../ui/dash-board/userprofile/Beneficiary";
import AssistantPresenter from "../../ui/dash-board/userprofile/AssistantPresenter";
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
          <Link
            to={`/dashboard/chats`}
            className="user-dashboard__button button"
          >
            تواصل مع المستخدم
          </Link>
          <button
            onClick={() => setOpenSuspensionModel(true)}
            className="user-dashboard__button  button--add"
          >
            طلب إيقاف الحساب
          </button>
          <button className="user-dashboard__button  user-dashboard__button--secondary">
            إيقاف الحساب
          </button>{" "}
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
      />
    </div>
  );
};

export default UserProfile;
