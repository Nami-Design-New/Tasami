import { useState } from "react";
import InfoCard from "../cards/InfoCard";
import CummunityRecordModal from "./CummunityRecordModal";
import ContractRecordModal from "./ContractRecordModal";
import { useNavigate } from "react-router";

const AssistantPresenter = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [showContractModal, setShowContractModal] = useState(false);
  function handleOpenModal() {
    console.log("modal Open");

    setShowModal(true);
  }
  return (
    <>
      <div className="row">
        <div className="col-12 col-md-6  p-1">
          <InfoCard
            title="حساب المساعد "
            link={"السيره الذاتيه"}
            event={() => navigate("/dashboard/resuems/1")}
          >
            <p>
              <span>نوع الحساب:</span>
              <span>أساسي</span>
            </p>
            <p>
              <span>تاريخ آخر اشتراك:</span>
              <span>2025-06-11</span>
            </p>
            <p>
              <span>مدة الاشتراك:</span>
              <span>6 شهور</span>
            </p>
            <p>
              <span>تاريخ نهاية الاشتراك:</span>
              <span>2025-06-11</span>
            </p>
            <p>
              <span>إجمالي مشتريات الاشتراكات:</span>
              <span>2,450 ريال</span>
            </p>
          </InfoCard>{" "}
          <InfoCard
            title="مجتمع المساعد"
            event={() => navigate("/dashboard/communities-details/1")}
            link={"سجل مجتمع المساعد "}
          >
            <p>
              <span>عدد المتابعين:</span>
              <span>4582</span>
            </p>
            <p>
              <span>حالة مجتمع المساعد:</span>
              <span>نشط</span>
            </p>
            <p>
              <span>عدد الأعضاء الطالبين:</span>
              <span>89</span>
            </p>
            <p>
              <span>المشورات:</span>
              <span>11</span>
            </p>
            <p>
              <span>اللقاءات:</span>
              <span>4</span>
            </p>
            <p>
              <span>الاجتماعات:</span>
              <span>5</span>
            </p>
            <p>
              <span>الاستشارات:</span>
              <span>22</span>
            </p>
            <p>
              <span>المشاهدات:</span>
              <span>8</span>
            </p>
            <p>
              <span>تقييم المجتمع الإجمالي:</span>
              <span>3.8</span>
            </p>
            <p>
              <span>مبيعات العضوية الإجمالي:</span>
              <span>2,450 ريال</span>
            </p>
          </InfoCard>
        </div>
        <div className="col-12 col-md-6  p-1">
          <InfoCard
            title="نشاط المساعد"
            link={"سجل عقود المساعد "}
            event={() => setShowContractModal(true)}
          >
            <p>
              <span>العروض المنشورة:</span>
              <span>4</span>
            </p>
            <p>
              <span>العروض الموثقة:</span>
              <span>1</span>
            </p>
            <p>
              <span>العروض المحذوفة:</span>
              <span>0</span>
            </p>
            <p>
              <span>العروض قيد التنفيذ:</span>
              <span>3</span>
            </p>
            <p>
              <span>العروض المكتملة:</span>
              <span>57</span>
            </p>
            <p>
              <span>الأهداف قيد التنفيذ:</span>
              <span>1</span>
            </p>
            <p>
              <span>الأهداف المكتملة:</span>
              <span>6</span>
            </p>
            <p>
              <span>الطلبات قيد التنفيذ:</span>
              <span>0</span>
            </p>
            <p>
              <span>الطلبات المكتملة:</span>
              <span>48</span>
            </p>
            <p>
              <span>عدد العملاء:</span>
              <span>125</span>
            </p>
            <p>
              <span>مبيعات العقود:</span>
              <span>2,450 ريال</span>
            </p>
            <p>
              <span>عدد عروض الأسعار الإجمالي:</span>
              <span>96</span>
            </p>
            <p>
              <span>نقاط الخبرة:</span>
              <span>34</span>
            </p>
            <p>
              <span>عدد بلاغات المخالفات:</span>
              <span>4</span>
            </p>
            <p>
              <span>الإتفاقات:</span>
              <span>1</span>
            </p>
            <p>
              <span>التقييم الإجمالي:</span>
              <span>4.5</span>
            </p>
            <p>
              <span>الخبرة والمعرفة:</span>
              <span>4.5</span>
            </p>
            <p>
              <span>الإلتزام بالمواعيد:</span>
              <span>3.9</span>
            </p>
            <p>
              <span>جودة الأداء:</span>
              <span>4.1</span>
            </p>
            <p>
              <span>الإحترام والتعامل:</span>
              <span>4.2</span>
            </p>
          </InfoCard>
        </div>
      </div>
      <CummunityRecordModal setShowModal={setShowModal} showModal={showModal} />
      <ContractRecordModal
        setShowModal={setShowContractModal}
        showModal={showContractModal}
        title={"سجل عقود المساعد"}
      />
    </>
  );
};

export default AssistantPresenter;
