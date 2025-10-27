import { useTranslation } from "react-i18next";
import useGetWorkDetails from "../../../../hooks/website/MyWorks/useGetWorkDetails";
import Loading from "../../../../ui/loading/Loading";
import AssistantWorkCard from "../../../../ui/website/my-works/work-offers/AssistantWorkCard";
import { useSelector } from "react-redux";
import Currency from "../../../../ui/Currency";

export default function ContractDetails() {
  const { t } = useTranslation();
  const { lang } = useSelector((state) => state.language);

  const { workDetails, isLoading } = useGetWorkDetails();
  if (isLoading) return <Loading />;
  return (
    <section className="work-details-page">
      <div
        className={`status-info  ${
          workDetails?.status !== "completed" ? "not-completed" : "completed"
        }`}
      >
        <span>
          {workDetails?.status === "wait_for_user_payment" && " تم تقديم عرض "}
          {workDetails?.status === "planning" && " بانتظار بدء خطة التنفيذ"}
          {workDetails?.status === "offers" && "بانتظار قبول العرض المناسب"}
          {workDetails?.status === "execution" && " بانتظار خطة التنفيذ"}
          {workDetails?.status === "payment" &&
            "تم الدفع وبإنتظار بدء خطة التنفيذ"}
          {workDetails?.status === "completed" && "مكتمل"}
        </span>
        <span>{workDetails?.status_date}</span>
      </div>
      <div className="mb-3">
        <AssistantWorkCard helper={workDetails?.user} />
      </div>
      <div className="my-3 work-description">
        <div className="label">
          {" "}
          {workDetails.rectangle === "personal_goal_with_helper" && (
            <>
              {" "}
              <img src="/icons/triangle-with-helper.svg" />{" "}
              {t("website.offerDetails.goal")}
            </>
          )}
          {workDetails.rectangle === "help_service_from_helper" && (
            <>
              <img src="/icons/help_service_from_helper.svg" />{" "}
              {t("website.offerDetails.offer")}
            </>
          )}
        </div>
        <p className="value">{workDetails?.title}</p>
      </div>
      <div className="goal-info">
        <div className="info-grid">
          <div className="info-box">
            <div className="label">{t("website.offerDetails.field")}</div>
            <div className="value">{workDetails?.category_title}</div>
          </div>
          <div className="info-box">
            <div className="label">{t("website.offerDetails.specialty")}</div>{" "}
            <div className="value">{workDetails?.sub_category_title}</div>
          </div>
          <div className="info-box">
            <div className="label">
              {t("website.offerDetails.expectedData")}
            </div>
            <div className="value">
              {workDetails?.goal?.expected_duration_human}
            </div>
          </div>
          <div className="info-box">
            <div className="label">{t("website.offerDetails.startDate")}</div>
            <div className="value">{workDetails?.goal?.start_date}</div>
          </div>
        </div>
      </div>{" "}
      {workDetails?.goal?.notes && (
        <div className="notse-box my-3">
          <div className="label">{t("website.offerDetails.extraTerms")}</div>
          <div className="value">{workDetails?.goal.notes}</div>
        </div>
      )}
      <div className="extra-terms">
        <h2>{t("website.offerDetails.mechanisms")}</h2>
        <ul className="mechanisms-list">
          {workDetails?.help_mechanisms.map((item) => (
            <li
              key={item.id}
              className={`mech-item  ${lang === "en" ? "en" : ""} `}
            >
              {item.title}
            </li>
          ))}
        </ul>
      </div>{" "}
      {workDetails?.offer_price >= 0 && (
        <div className="notse-box my-3">
          <div className="label">{t("website.offerDetails.price")}</div>
          <div className="value">
            {workDetails?.offer_price} <Currency />
          </div>
        </div>
      )}
    </section>
  );
}
