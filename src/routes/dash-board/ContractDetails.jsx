import AssistantData from "../../ui/dash-board/contractDetails/AssistantData";
import ChatHistory from "../../ui/dash-board/contractDetails/ChatHistory";
import ContractDescription from "../../ui/dash-board/contractDetails/ContractDescription";
import PaymentContractData from "../../ui/dash-board/contractDetails/PaymentContractData";

export default function DashboardContractDetails() {
  return (
    <section>
      <div className="row">
        <div className="col-12 p-2">
          <div className="contract-header">
            <div className="contract-title">
              <h1>العقد: #OB-1729577487610</h1>
              <p>خدمات استشارة الرعاية الصحية المتقدمة</p>
            </div>
            <div className="contract-dates">
              <div className="date-item">
                <i className="fa-regular fa-calendar"></i>
                <span>تاريخ العرض : 12-07-2025 </span>
              </div>

              <div className="date-item">
                <i className="fa-regular fa-clock"></i>
                <span> 12:30 PM , تاريخ الإنشاء: 07-08-2025 </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-lg-4 p-2">
          <div className="col pb-2">
            <AssistantData />
          </div>
          <div className="col pt-2">
            <PaymentContractData />
          </div>
        </div>
        <div className="col-12 col-lg-8 p-2">
          <ContractDescription />
        </div>
      </div>
      <div className="row">
        <div className="col-12 p-2">
          <ChatHistory />
        </div>
      </div>
    </section>
  );
}
