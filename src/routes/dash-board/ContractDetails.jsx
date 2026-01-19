import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router";
import useGetContractDetails from "../../hooks/dashboard/subscription/contracts/useGetContractDetails";
import AssistantData from "../../ui/dash-board/contractDetails/AssistantData";
import ChatHistory from "../../ui/dash-board/contractDetails/ChatHistory";
import ContractDescription from "../../ui/dash-board/contractDetails/ContractDescription";
import PaymentContractData from "../../ui/dash-board/contractDetails/PaymentContractData";
import Loading from "../../ui/loading/Loading";
import RoundedBackButton from "../../ui/website-auth/shared/RoundedBackButton";

export default function DashboardContractDetails() {
  const { id: contractId, userId } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const {
    messages,
    contract,
    work,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetContractDetails(userId, contractId);

  if (isLoading) return <Loading />;

  return (
    <section>
      <div className="row">
        <div className="col-12 p-2">
          <div className="contract-header">
            <div className="contract-title d-flex align-items-center gap-2">
              <RoundedBackButton
                onClick={() => navigate(-1)}
              ></RoundedBackButton>
              <h1>{t("contractNumber", { code: contract?.code })}</h1>
            </div>
            <div className="contract-dates">
              <div className="date-item">
                <i className="fa-regular fa-clock"></i>
                {t("contractCreatedAt")}: {contract?.created_at}{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-lg-4 p-2">
          <div className="col pb-2">
            <AssistantData user={work?.user} />
          </div>
          <div className="col pt-2">
            <PaymentContractData contract={contract} />
          </div>
        </div>
        <div className="col-12 col-lg-8 p-2">
          <ContractDescription work={work} />
        </div>
      </div>
      <div className="row">
        <div className="col-12 p-2">
          <ChatHistory
            messages={messages}
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            isLoading={isLoading}
          />
        </div>
      </div>
    </section>
  );
}
