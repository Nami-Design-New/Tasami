import { useState } from "react";
import InfoCard from "../cards/InfoCard";
import CummunityRecordModal from "./CummunityRecordModal";
import ContractRecordModal from "./ContractRecordModal";
import { useNavigate } from "react-router";
import { PAGE_SIZE } from "../../../utils/constants";
import useGetHelperContract from "../../../hooks/dashboard/subscription/usePostHelperContract";
import { useTranslation } from "react-i18next";

const AssistantPresenter = ({ userDetails }) => {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const user_id = userDetails?.id;
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE);
  const [searchQuery, setSearchQuery] = useState("");
  const { helperContract, currentPage, lastPage, isLoading } =
    useGetHelperContract(searchQuery, page, PAGE_SIZE, user_id);
  const handleSearchChange = (value) => {
    setSearchQuery(value);
  };
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
            title={t("dashboard.assistant.titles.account")}
            link={t("dashboard.assistant.links.resume")}
            event={() => navigate(`/dashboard/resuems/${user_id}`)}
          >
            <p>
              <span>{t("dashboard.assistant.fields.accountType")}:</span>
              <span> {userDetails?.account_type} </span>
            </p>
            <p>
              <span>
                {t("dashboard.assistant.fields.lastSubscriptionDate")}:
              </span>
              <span> {userDetails?.current_scubscription?.start_date} </span>
            </p>
            <p>
              <span>
                {t("dashboard.assistant.fields.subscriptionDuration")}:
              </span>
              <span>
                {" "}
                {userDetails?.current_scubscription.package?.type_title}{" "}
              </span>
            </p>
            <p>
              <span>
                {t("dashboard.assistant.fields.subscriptionEndDate")}:
              </span>
              <span> {userDetails?.current_scubscription?.end_date} </span>
            </p>
            <p>
              <span>
                {t("dashboard.assistant.fields.totalSubscriptionPurchases")}:
              </span>
              <span> {userDetails?.total_subscription_purchases} </span>
            </p>
          </InfoCard>
          <InfoCard
            title={t("dashboard.assistant.titles.community")}
            event={() =>
              navigate(
                `/dashboard/communities-details/${userDetails?.community?.id}`
              )
            }
            link={t("dashboard.assistant.links.communityLog")}
          >
            <p>
              <span>{t("dashboard.assistant.fields.communityStatus")}:</span>
              <span>
                {userDetails?.community?.is_active
                  ? t("dashboard.common.active")
                  : t("dashboard.common.inactive")}
              </span>
            </p>
            {userDetails?.community?.is_active && (
              <>
                <p>
                  <span>{t("dashboard.assistant.fields.membersCount")}:</span>
                  <span> {userDetails?.community?.members_count} </span>
                </p>
                <p>
                  <span>{t("dashboard.assistant.fields.postsCount")}:</span>
                  <span> {userDetails?.community?.posts_count} </span>
                </p>
                <p>
                  <span>{t("dashboard.assistant.fields.meetingsCount")}:</span>
                  <span> {userDetails?.community?.meetings_count} </span>
                </p>
                <p>
                  <span>
                    {t("dashboard.assistant.fields.consultationsCount")}:
                  </span>
                  <span> {userDetails?.community?.consultations_count} </span>
                </p>
                <p>
                  <span>{t("dashboard.assistant.fields.viewsCount")}:</span>
                  <span> {userDetails?.community?.views_count} </span>
                </p>
                <p>
                  <span>
                    {t("dashboard.assistant.fields.totalMembershipRevenue")}:
                  </span>
                  <span> {`ريال${userDetails?.community?.revenue}`} </span>
                </p>
              </>
            )}
          </InfoCard>
        </div>

        {/* Assistant Activity */}
        <div className="col-12 col-md-6 p-1">
          <InfoCard
            title={t("dashboard.assistant.titles.activity")}
            link={t("dashboard.assistant.links.contractLog")}
            event={() => setShowContractModal(true)}
          >
            <p>
              <span>{t("dashboard.assistant.fields.activeOffers")}:</span>
              <span> {userDetails?.active_helpe_services} </span>
            </p>
            <p>
              <span>{t("dashboard.assistant.fields.archivedOffers")}:</span>
              <span> {userDetails?.archived_helpe_services} </span>
            </p>
            <p>
              <span>{t("dashboard.assistant.fields.deletedOffers")}:</span>
              <span> {userDetails?.deleted_helpe_services} </span>
            </p>
            <p>
              <span>{t("dashboard.assistant.fields.activeContracts")}:</span>
              <span> {userDetails?.active_helper_contracts} </span>
            </p>
            <p>
              <span>{t("dashboard.assistant.fields.completedContracts")}:</span>
              <span> {userDetails?.comlpeted_helper_contracts} </span>
            </p>
            <p>
              <span>{t("dashboard.assistant.fields.clientsCount")}:</span>
              <span> {userDetails?.member} </span>
            </p>
            <p>
              <span>{t("dashboard.assistant.fields.contractRevenue")}:</span>
              <span> {`ريال${userDetails?.contract_revenue}`} </span>
            </p>
            <p>
              <span>{t("dashboard.assistant.fields.totalPriceOffers")}:</span>
              <span> {userDetails?.goal_offers} </span>
            </p>
            <p>
              <span>{t("dashboard.assistant.fields.experiencePoints")}:</span>
              <span> {userDetails?.total_helper_points} </span>
            </p>
            <p>
              <span>{t("dashboard.assistant.fields.stopsNumber")}:</span>
              <span> {userDetails?.stops_number} </span>
            </p>
            <p>
              <span>{t("dashboard.assistant.fields.violationReports")}:</span>
              <span> {userDetails?.violation_reports} </span>
            </p>
            <p>
              <span>{t("dashboard.assistant.fields.avgRate")}:</span>
              <span> {userDetails?.avg_rate} </span>
            </p>
            <p>
              <span>
                {t("dashboard.assistant.fields.experienceAndKnowledge")}:
              </span>
              <span> {userDetails?.experience_and_knowledge} </span>
            </p>
            <p>
              <span>{t("dashboard.assistant.fields.commitmentToTime")}:</span>
              <span> {userDetails?.commitment_to_time} </span>
            </p>
            <p>
              <span>{t("dashboard.assistant.fields.performanceQuality")}:</span>
              <span> {userDetails?.quality_of_performance} </span>
            </p>
            <p>
              <span>
                {t("dashboard.assistant.fields.respectAndTreatment")}:
              </span>
              <span> {userDetails?.respect_and_treatment} </span>
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
        title={t("dashboard.assistant.links.contractLog")}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        searchDebounceMs={700}
        setSearchQuery={setSearchQuery}
        search={true}
      />
    </>
  );
};

export default AssistantPresenter;
