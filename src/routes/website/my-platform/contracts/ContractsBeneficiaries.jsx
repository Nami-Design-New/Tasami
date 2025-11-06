import { ProgressBar } from "react-bootstrap";
import { useOutletContext } from "react-router";
import useGetContractDetails from "../../../../hooks/website/MyWorks/assistants/useGetContractDetails";
import Currency from "../../../../ui/Currency";
import CustomButton from "../../../../ui/CustomButton";
import Loading from "../../../../ui/loading/Loading";
import AssistantWorkCard from "../../../../ui/website/my-works/work-offers/AssistantWorkCard";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import useAcceptOrRefuseRenewRequest from "../../../../hooks/website/contracts/useAcceptOrRefuseRenewRequest";
import { useQueryClient } from "@tanstack/react-query";

export default function ContractsBeneficiaries() {
  const { t } = useTranslation();
  const { contractId } = useOutletContext();
  const { contractDetails, isLoading } = useGetContractDetails(contractId);
  const queryClient = useQueryClient();
  const { acceptMutation, isAccepting, refuseMutation, isRefusing } =
    useAcceptOrRefuseRenewRequest();

  const handleReject = () => {
    refuseMutation(contractDetails.id, {
      onSuccess: () => {
        toast.success(t("Renew request refused successfully"));
        queryClient.invalidateQueries({ queryKey: ["contract-details"] });
      },
      onError: (err) => {
        toast.error(err.message || t("Failed to refuse renew request"));
      },
    });
  };

  const handleAccept = () => {
    acceptMutation(contractDetails.id, {
      onSuccess: () => {
        toast.success(t("Renew request accepted successfully"));
        queryClient.invalidateQueries({ queryKey: ["contract-details"] });
      },
      onError: (err) => {
        toast.error(err.message || t("Failed to accept renew request"));
      },
    });
  };

  if (isLoading) return <Loading />;
  return (
    <section className="work-contract-details ">
      <div className="container">
        <div className="row">
          <div className="col-4 p-2">
            <div className="d-flex flex-column gap-3">
              <AssistantWorkCard
                helper={contractDetails?.user}
                chat={false}
                prevAssistant={contractDetails?.status !== "working"}
              />

              {contractDetails?.renew_to_date !== "" &&
                contractDetails?.renew_price !== "" && (
                  <div className="renew-details">
                    <h6> طلب تمديد تعاقد </h6>
                    <div className="d-flex align-items-center gap-2">
                      <p className="renew-date">
                        <span> تاريخ التمديد : </span>
                        <span>{contractDetails?.renew_to_date}</span>
                      </p>

                      <p className="renew-date">
                        <span>سعر التمديد:</span>
                        <span>
                          {contractDetails?.renew_price} <Currency />
                        </span>
                      </p>
                    </div>
                    <div className="d-flex align-content-center gap-1">
                      <CustomButton
                        color="fire"
                        size="large"
                        variant="outlined"
                        onClick={handleReject}
                        disabled={isRefusing}
                        loading={isRefusing}
                      >
                        {t("reject")}
                      </CustomButton>
                      <CustomButton
                        fullWidth
                        color="success"
                        size="large"
                        onClick={handleAccept}
                        disabled={isAccepting}
                        loading={isAccepting}
                      >
                        {t("accept")}
                      </CustomButton>
                    </div>
                  </div>
                )}
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
                  <ProgressBar
                    label=""
                    now={contractDetails?.progress_percent}
                  />
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
