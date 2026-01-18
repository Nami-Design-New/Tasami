import { useParams } from "react-router";
import AssistantData from "../../ui/dash-board/contractDetails/AssistantData";
import ChatHistory from "../../ui/dash-board/contractDetails/ChatHistory";
import ContractDescription from "../../ui/dash-board/contractDetails/ContractDescription";
import PaymentContractData from "../../ui/dash-board/contractDetails/PaymentContractData";
import useGetContractDetails from "../../hooks/dashboard/subscription/contracts/useGetContractDetails";
import Loading from "../../ui/loading/Loading";

export default function DashboardContractDetails() {
  const { id: contractId, userId } = useParams();
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
  console.log("messages:", messages);
  console.log("contract:", contract);
  console.log("work:", work);

  return (
    <section>
      <div className="row">
        <div className="col-12 p-2">
          <div className="contract-header">
            <div className="contract-title">
              <h1>العقد: # {contract?.code}</h1>
            </div>
            <div className="contract-dates">
              <div className="date-item">
                <i className="fa-regular fa-clock"></i>
                <span> تاريخ الإنشاء: {contract?.created_at} </span>
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
