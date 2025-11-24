import { useState } from "react";
import InfoCard from "../cards/InfoCard";
import CummunityRecordModal from "./CummunityRecordModal";
import ContractRecordModal from "./ContractRecordModal";
import { useNavigate } from "react-router";
import { PAGE_SIZE } from "../../../utils/constants";
import useGetHelperContract from "../../../hooks/dashboard/subscription/usePostHelperContract";

const AssistantPresenter = ({ userDetails }) => {
  const [showModal, setShowModal] = useState(false);
  const user_id = userDetails?.id;
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE);
  const { helperContract, currentPage, lastPage, isLoading } =
    useGetHelperContract("", page, PAGE_SIZE, user_id);

  const navigate = useNavigate();
  const [showContractModal, setShowContractModal] = useState(false);
  function handleOpenModal() {
    setShowModal(true);
  }
  return (
    <>
      <div className="row">
        <div className="col-12 col-md-6  p-1">
          <InfoCard
            title="حساب المساعد "
            link={"السيره الذاتيه"}
            event={() => navigate(`/dashboard/resuems/${user_id}`)}
          >
            <p>
              <span>نوع الحساب:</span>
              <span> {`${userDetails?.account_type}`} </span>
            </p>
            <p>
              <span>تاريخ آخر اشتراك:</span>
              <span> {`${userDetails?.subscription_end_date}`} ! </span>
            </p>
            <p>
              <span>مدة الاشتراك:</span>
              <span>
                {" "}
                {`${userDetails?.current_scubscription.end_date}`} !{" "}
              </span>
            </p>
            <p>
              <span>تاريخ نهاية الاشتراك:</span>
              <span>
                {" "}
                {`${userDetails?.current_scubscription.end_date}`} !{" "}
              </span>
            </p>
            <p>
              <span>إجمالي مشتريات الاشتراكات:</span>
              <span>
                {" "}
                {`${userDetails?.current_scubscription.app_commission}`} !{" "}
              </span>
            </p>
          </InfoCard>{" "}
          <InfoCard
            title="مجتمع المساعد"
            event={() => navigate(`/dashboard/communities-details/${user_id}`)}
            link={"سجل مجتمع المساعد "}
          >
            <p>
              <span>عدد المتابعين:</span>
              <span> {`${userDetails?.community.members_count}`} </span>
            </p>
            <p>
              <span>حالة مجتمع المساعد:</span>
              <span>نشط!</span>
            </p>
            <p>
              <span>عدد الأعضاء الطالبين:</span>
              <span>89!</span>
            </p>
            <p>
              <span>المنشورات:</span>
              <span> {`${userDetails?.community.posts_count}`} </span>
            </p>
            <p>
              <span>اللقاءات:</span>
              <span>4!</span>
            </p>
            <p>
              <span>الاجتماعات:</span>
              <span> {`${userDetails?.community.meetings_count}`} </span>
            </p>
            <p>
              <span>الاستشارات:</span>
              <span> {`${userDetails?.community.consultations_count}`} </span>
            </p>
            <p>
              <span>المشاهدات:</span>
              <span>8!</span>
            </p>
            <p>
              <span>تقييم المجتمع الإجمالي:</span>
              <span>3.8!</span>
            </p>
            <p>
              <span>مبيعات العضوية الإجمالي:</span>
              <span>2,450 ريال!</span>
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
              <span>العروض النشطه:</span>
              <span> {`${userDetails?.active_helpe_services}`} </span>
            </p>
            <p>
              <span>العروض المؤرشفه:</span>
              <span> {`${userDetails?.archived_helpe_services}`} </span>
            </p>
            <p>
              <span>العروض المحذوفة:</span>
              <span> {`${userDetails?.deleted_helpe_services}`} </span>
            </p>
            <p>
              <span>العروض قيد التنفيذ:</span>
              <span>3!</span>
            </p>
            <p>
              <span>العروض المكتملة:</span>
              <span> {`${userDetails?.comlpeted_helper_contracts}`} </span>
            </p>
            <p>
              <span>الأهداف قيد التنفيذ:</span>
              <span> {`${userDetails?.goal_helper_contracts}`} </span>
            </p>
            {/* <p>
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
            </p> */}
            <p>
              <span>عدد العملاء:</span>
              <span> {`${userDetails?.member}`} </span>
            </p>
            <p>
              <span>مبيعات العقود:</span>
              <span> {`ريال${userDetails?.contract_revenue}`} </span>
            </p>
            <p>
              <span>عدد عروض الأسعار الإجمالي:</span>
              <span> {`${userDetails?.goal_offer_price}`} </span>
            </p>
            <p>
              <span>نقاط الخبرة:</span>
              <span>34 !</span>
            </p>
            <p>
              <span>عدد بلاغات المخالفات:</span>
              <span>! 4</span>
            </p>
            <p>
              <span>الإتفاقات:</span>
              <span>! 1</span>
            </p>
            <p>
              <span>التقييم الإجمالي:</span>
              <span> {`${userDetails?.avg_rate}`} </span>
            </p>
            <p>
              <span>الخبرة والمعرفة:</span>
              <span> {`${userDetails?.experience_and_knowledge}`} </span>
            </p>
            <p>
              <span>الإلتزام بالمواعيد:</span>
              <span> {`${userDetails?.commitment_to_time}`} </span>
            </p>
            <p>
              <span>جودة الأداء:</span>
              <span> {`${userDetails?.quality_of_performance}`} </span>
            </p>
            <p>
              <span>الإحترام والتعامل:</span>
              <span> {`${userDetails?.respect_and_treatment}`} </span>
            </p>
          </InfoCard>
        </div>
      </div>
      <CummunityRecordModal setShowModal={setShowModal} showModal={showModal} />
      <ContractRecordModal
        data={helperContract}
        page={page}
        currentPage={currentPage}
        lastPage={lastPage}
        setPage={setPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
        isLoading={isLoading}
        setShowModal={setShowContractModal}
        showModal={showContractModal}
        title={"سجل عقود المساعد"}
      />
    </>
  );
};

export default AssistantPresenter;
