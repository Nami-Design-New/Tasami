import { useTranslation } from "react-i18next";
import useGetContractDetails from "../../../../hooks/website/MyWorks/assistants/useGetContractDetails";
import Loading from "../../../../ui/loading/Loading";

export default function ContractDetails() {
  const { t } = useTranslation();
  const { contractDetails, isLoading } = useGetContractDetails();
  if (isLoading) return <Loading />;
  return (
    <section className="work-details-page">
      <div
        className={`status-info  ${
          contractDetails.status !== "completed" ? "not-completed" : "completed"
        }`}
      >
        <span>
          {contractDetails.status === "planning" && " بانتظار بدء خطة التنفيذ"}
          {contractDetails.status === "offers" && "بانتظار قبول العرض المناسب"}
          {contractDetails.status === "execution" && " بانتظار خطة التنفيذ"}
          {contractDetails.status === "payment" &&
            "تم الدفع وبإنتظار بدء خطة التنفيذ"}
          {contractDetails.status === "completed" && "مكتمل"}
        </span>
        <span>{contractDetails.status_date}</span>
      </div>{" "}
      <div className="goal-info">
        <div className="info-grid">
          <div className="info-box">
            <div className="label">{t("website.offerDetails.field")}</div>
            <div className="value">{contractDetails.category_title}</div>
          </div>
          <div className="info-box">
            <div className="label">{t("website.offerDetails.specialty")}</div>{" "}
            <div className="value">{contractDetails.sub_category_title}</div>
          </div>
          <div className="info-box">
            <div className="label">{t("website.offerDetails.goal")}</div>
            <div className="value">{contractDetails?.title}</div>
          </div>
          <div className="info-box">
            <div className="label">{t("website.offerDetails.startDate")}</div>
            <div className="value">{contractDetails?.goal?.start_date}</div>
          </div>
          {contractDetails.goal.notes && (
            <div className="info-box">
              <div className="label">
                {t("website.offerDetails.extraTerms")}
              </div>
              <div className="value">{contractDetails.goal.notes}</div>
            </div>
          )}
          <div className="info-box">
            <div className="label">
              {t("website.offerDetails.expectedData")}
            </div>
            <div className="value">
              {contractDetails?.goal?.expected_duration_human}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
