import { useTranslation } from "react-i18next";
import useGetWorkDetails from "../../../hooks/website/MyWorks/useGetWorkDetails";
import Loading from "../../../ui/loading/Loading";

export default function WorksDetails() {
  const { t } = useTranslation();
  const { workDetails, isLoading } = useGetWorkDetails();
  if (isLoading) return <Loading />;
  return (
    <section className="work-details-page">
      <div
        className={`status-info  ${
          workDetails.status !== "completed" ? "not-completed" : "completed"
        }`}
      >
        <span>
          {workDetails.status === "planning" && " بانتظار بدء خطة التنفيذ"}
          {workDetails.status === "offers" && "بانتظار قبول العرض المناسب"}
          {workDetails.status === "execution" && " بانتظار خطة التنفيذ"}
          {workDetails.status === "payment" &&
            "تم الدفع وبإنتظار بدء خطة التنفيذ"}
          {workDetails.status === "completed" && " بانتظار خطة التنفيذ"}
        </span>
        <span>{workDetails.status_date}</span>
      </div>

      <div className="goal-info">
        <div className="info-grid">
          <div className="info-box">
            <div className="label">{t("website.offerDetails.field")}</div>
            <div className="value">{workDetails.category_title}</div>
          </div>{" "}
          <div className="info-box">
            <div className="label">{t("website.offerDetails.specialty")}</div>{" "}
            <div className="value">{workDetails.sub_category_title}</div>
          </div>{" "}
          <div className="info-box">
            <div className="label">{t("website.offerDetails.goal")}</div>
            <div className="value">{workDetails?.title}</div>
          </div>
          <div className="info-box">
            <div className="label">{t("website.offerDetails.startDate")}</div>
            <div className="value">{workDetails?.goal?.start_date}</div>
          </div>
          {workDetails.goal.notes && (
            <div className="info-box">
              <div className="label">
                {t("website.offerDetails.extraTerms")}
              </div>
              <div className="value">{workDetails.goal.notes}</div>
            </div>
          )}
          <div className="info-box">
            <div className="label">
              {t("website.offerDetails.expectedData")}
            </div>
            <div className="value">
              {workDetails?.goal?.expected_duration_human}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
