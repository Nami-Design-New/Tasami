import { ProgressBar } from "react-bootstrap";
import { useOutletContext } from "react-router";
import useGetContractDetails from "../../../../hooks/website/MyWorks/assistants/useGetContractDetails";
import Currency from "../../../../ui/Currency";
import CustomLink from "../../../../ui/CustomLink";
import Loading from "../../../../ui/loading/Loading";
import AssistantWorkCard from "../../../../ui/website/my-works/work-offers/AssistantWorkCard";

export default function ContractsBeneficiaries() {
  const { contractId } = useOutletContext();

  const { contractDetails, isLoading } = useGetContractDetails(contractId);

  if (isLoading) return <Loading />;
  return (
    <section className="work-contract-details ">
      <div className="container">
        <div className="row">
          <div className="col-4 p-2">
            <div className="d-flex flex-column gap-3">
              <AssistantWorkCard
                helper={contractDetails?.helper}
                chat={false}
                prevAssistant={contractDetails?.status !== "working"}
              />
              <CustomLink
                type="outlined"
                fullWidth
                size="large"
                to={`/helper/${contractDetails.helper.id}`}
              >
                السيرة الذاتية
              </CustomLink>
            </div>
          </div>
          <div className="col-8 p-2">
            <div className="contract-data">
              <h2>المدفوعات</h2>
              <div className="goal-info">
                <div className="info-grid">
                  <div className="info-box flex-grow-1">
                    <div className="label">قيمة العقد</div>
                    <div className="value">
                      {contractDetails?.total_price}
                      <Currency />
                    </div>
                  </div>
                  <div className="info-box flex-grow-1">
                    <div className="label">مدة العقد</div>
                    <div className="value">{contractDetails?.total_days}</div>
                  </div>
                  <div className="info-box flex-grow-1">
                    <div className="label">
                      قيمة الاستحقاق اليومي للمساعد الشخصي
                    </div>
                    <div className="value">
                      {contractDetails?.day_price}
                      <Currency />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="goal-info mt-2">
              <div className="info-grid">
                <div className="info-box flex-grow-1">
                  <div className="label">التقدم </div>
                  <div className="progress-bar-label">
                    <span>{contractDetails?.progress_days} ايام</span>
                    <span>{contractDetails?.total_days} يوم</span>
                  </div>
                  <ProgressBar label="" now={60} />
                </div>
              </div>
            </div>
            <div className="goal-info mt-2">
              <div className="info-grid">
                <div className="info-box flex-grow-1">
                  <div className="label">القيمة المستحقة للمساعد</div>
                  <div className="value">
                    {contractDetails?.received_money}
                    <Currency />
                  </div>
                </div>
                <div className="info-box flex-grow-1">
                  <div className="label">رصيد الضمان المتبقي</div>{" "}
                  <div className="value">
                    {contractDetails?.reminder_money} <Currency />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
