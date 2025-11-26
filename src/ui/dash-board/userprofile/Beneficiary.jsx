import { useState } from "react";
import InfoCard from "../cards/InfoCard";
import ContractRecordModal from "./ContractRecordModal";
import { PAGE_SIZE } from "../../../utils/constants";
import useGetUserContract from "../../../hooks/dashboard/subscription/usePostUserContract";

const Beneficiary = ({ userDetails }) => {
  const [showModal, setShowModal] = useState(false);
  const user_id = userDetails?.id;
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE);
  const { userContract, currentPage, lastPage, isLoading } = useGetUserContract(
    "",
    page,
    PAGE_SIZE,
    user_id
  );

  console.log("user contract ", userContract);
  
  return (
    <>
      <div className="row">
        <div className="col-12 col-md-6 p-1">
          <InfoCard title=" حساب المستفيد">
            <p>
              <span>رقم الحساب:</span>
              <span> {`${userDetails?.account_code}`} </span>
            </p>
            <p>
              <span>رقم التعريف:</span>
              <span> {`${userDetails?.identify_code}`} </span>
            </p>
            <p>
              <span>تاريخ التسجيل:</span>
              <span> {`${userDetails?.subscription_start_date}`} </span>
            </p>
            <p>
              <span>حالة الحساب:</span>
              <span> {`${userDetails?.status}`} </span>
            </p>
            <p>
              <span>تاريخ حالة الحساب:</span>
              <span> {`${userDetails?.account_status_date}`} </span>
            </p>
            <p>
              <span>تاريخ آخر دخول:</span>
              <span> {`${userDetails?.subscription_end_date}`} </span>
            </p>
          </InfoCard>
        </div>
        <div className="col-12 col-md-6 p-1">
          <InfoCard
            title="نشاط المستفيد"
            event={() => setShowModal(true)}
            link=" سجل عقود المستفيد "
          >
            <p>
              <span>الأهداف المكتملة:</span>
              <span> {`${userDetails?.completed_goals}`} </span>
            </p>
            <p>
              <span>الأهداف قيد التنفيذ:</span>
              <span> {`${userDetails?.execution_goals}`} </span>
            </p>
            <p>
              <span>الطلبات المكتملة:</span>
              <span> {`${userDetails?.completed_requests}`} </span>
            </p>
            <p>
              <span>الطلبات قيد التنفيذ:</span>
              <span> {`${userDetails?.execution_requests}`} </span>
            </p>
            <p>
              <span>العروض المكتملة:</span>
              <span> {`${userDetails?.completed_help_service}`} </span>
            </p>
            <p>
              <span>العروض قيد التنفيذ:</span>
              <span> {`${userDetails?.execution_help_service}`} </span>
            </p>
            <p>
              <span>مشتريات العقود:</span>
              <span> {`ريال ${userDetails?.contract_cost}`} </span>
            </p>
            <p>
              <span>نقاط الخبرة:</span>
              <span> {`${userDetails?.experience_level}`} </span>
            </p>
            <p>
              <span>عضوية المجتمعات:</span>
              <span> {`${userDetails?.total_user_points}`} </span>
            </p>
            <p>
              <span>المتابعون:</span>
              <span> {`${userDetails?.community_count}`} </span>
            </p>
            <p>
              <span>مشتركات المجتمعات:</span>
              <span> {`${userDetails?.community_subscritions}`} </span>
            </p>
            <p>
              <span>الاقتراحات:</span>
              <span> {`${userDetails?.subscription_start_date}`} </span>
            </p>
            <p>
              <span>التصنيفات الجديدة:</span>
              <span> {`${userDetails?.subscription_start_date}`} </span>
            </p>
            <p>
              <span>بلاغات المخالفات:</span>
              <span> {`${userDetails?.subscription_start_date}`} </span>
            </p>
          </InfoCard>
        </div>
        <ContractRecordModal
          data={userContract}
          page={page}
          currentPage={currentPage}
          lastPage={lastPage}
          setPage={setPage}
          pageSize={pageSize}
          setPageSize={setPageSize}
          isLoading={isLoading}
          showModal={showModal}
          setShowModal={setShowModal}
          title={" سجل عقود المستفيد "}
        />
      </div>
    </>
  );
};

export default Beneficiary;
