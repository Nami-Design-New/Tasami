import { useState } from "react";
import InfoCard from "../cards/InfoCard";
import { PAGE_SIZE } from "../../../utils/constants";
import useGetUserContract from "../../../hooks/dashboard/subscription/usePostUserContract";
import ContractRecordModal from "./ContractRecordModal";
import { useTranslation } from "react-i18next";

const Beneficiary = ({ userDetails }) => {
  const { t } = useTranslation();
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

  return (
    <>
      <div className="row">
        <div className="col-12 col-md-6 p-1">
          <InfoCard title={t("dashboard.beneficiary.titles.account")}>
            <p>
              <span>{t("dashboard.beneficiary.fields.accountNumber")}:</span>
              <span> {userDetails?.account_code} </span>
            </p>
            <p>
              <span>{t("dashboard.beneficiary.fields.identifierNumber")}:</span>
              <span> {userDetails?.identify_code} </span>
            </p>
            <p>
              <span>{t("dashboard.beneficiary.fields.registrationDate")}:</span>
              <span> {userDetails?.subscription_start_date} </span>
            </p>
            <p>
              <span>{t("dashboard.beneficiary.fields.accountStatus")}:</span>
              <span> {userDetails?.status} </span>
            </p>
            <p>
              <span>
                {t("dashboard.beneficiary.fields.accountStatusDate")}:
              </span>
              <span> {userDetails?.account_status_date} </span>
            </p>
            <p>
              <span>{t("dashboard.beneficiary.fields.lastLoginDate")}:</span>
              <span> {userDetails?.subscription_end_date} </span>
            </p>
          </InfoCard>
        </div>
        <div className="col-12 col-md-6 p-1">
          <InfoCard
            title={t("dashboard.beneficiary.titles.activity")}
            event={() => setShowModal(true)}
            link={t("dashboard.beneficiary.titles.contractLog")}
          >
            <p>
              <span>{t("dashboard.beneficiary.fields.completedGoals")}:</span>
              <span> {userDetails?.completed_goals} </span>
            </p>
            <p>
              <span>{t("dashboard.beneficiary.fields.inProgressGoals")}:</span>
              <span> {userDetails?.execution_goals} </span>
            </p>
            <p>
              <span>
                {t("dashboard.beneficiary.fields.completedRequests")}:
              </span>
              <span> {userDetails?.completed_requests} </span>
            </p>
            <p>
              <span>
                {t("dashboard.beneficiary.fields.inProgressRequests")}:
              </span>
              <span> {userDetails?.execution_requests} </span>
            </p>
            <p>
              <span>{t("dashboard.beneficiary.fields.completedOffers")}:</span>
              <span> {userDetails?.completed_help_service} </span>
            </p>
            <p>
              <span>{t("dashboard.beneficiary.fields.inProgressOffers")}:</span>
              <span> {userDetails?.execution_help_service} </span>
            </p>
            <p>
              <span>
                {t("dashboard.beneficiary.fields.contractPurchases")}:
              </span>
              <span> {`ريال ${userDetails?.contract_cost}`} </span>
            </p>
            <p>
              <span>{t("dashboard.beneficiary.fields.experiencePoints")}:</span>
              <span> {userDetails?.experience_level} </span>
            </p>
            <p>
              <span>
                {t("dashboard.beneficiary.fields.communityMembership")}:
              </span>
              <span> {userDetails?.community_subscription_count} </span>
            </p>
            <p>
              <span>{t("dashboard.beneficiary.fields.followers")}:</span>
              <span> {userDetails?.community_count} </span>
            </p>
            <p>
              <span>
                {t("dashboard.beneficiary.fields.communitySubscriptions")}:
              </span>
              <span> {userDetails?.community_subscritions} </span>
            </p>
            <p>
              <span>{t("dashboard.beneficiary.fields.suggestions")}:</span>
              <span> {userDetails?.suggestions_count} </span>
            </p>
            <p>
              <span>
                {t("dashboard.beneficiary.fields.newClassifications")}:
              </span>
              <span> {userDetails?.new_classifications_count} </span>
            </p>
            <p>
              <span>{t("dashboard.beneficiary.fields.violationReports")}:</span>
              <span> {userDetails?.own_violation_reports_count} </span>
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
          title={t("dashboard.beneficiary.titles.contractLog")}
        />
      </div>
    </>
  );
};

export default Beneficiary;
