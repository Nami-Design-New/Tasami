import { useTranslation } from "react-i18next";
import WorkProgress from "../website/my-works/WorkProgress";
import { Link } from "react-router";
import HelperCard from "./HelperCard";

export default function WorkCard({ work, withoutStatus = false }) {
  let steps;
  const { t } = useTranslation();
  if (work.rectangle === "personal_goal") {
    steps = [
      { key: "planning", label: t("works.status.plan") },
      {
        key: "execution",
        label: t("works.status.start"),
      },
    ];
  } else if (work.rectangle === "personal_goal_with_helper") {
    steps = [
      { key: "offers", label: t("works.status.offers") },
      { key: "payment", label: t("works.status.payment") },
      { key: "planning", label: t("works.status.plan") },
      {
        key: "execution",
        label: t("works.status.start"),
      },
    ];
  } else {
    steps = [
      { key: "wait_helper_to_accept", label: t("works.status.waitAccept") },
      { key: "wait_for_user_payment", label: t("works.status.request") },
      { key: "payment", label: t("works.status.payment") },
      { key: "planning", label: t("works.status.plan") },
      {
        key: "execution",
        label: t("works.status.start"),
      },
    ];
  }
  const currentIndex = steps.findIndex((s) => s.key === work.status);
  const progressSteps = steps.map((step, index) => ({
    ...step,
    completed: index <= currentIndex && work.status !== "canceled",
    current: index === currentIndex && work.status !== "canceled",
  }));

  return (
    <Link to={`/my-works/${work.id}`} className="work-card">
      {work.status === "execution" && work.helper !== null && (
        <HelperCard helper={work.helper} />
      )}
      <div className="work-title">
        {work.rectangle === "personal_goal_with_helper" && (
          <img src="/icons/triangle-with-helper.svg" />
        )}
        {work.rectangle === "personal_goal" && (
          <img src="/icons/triangle-without-helper.png" />
        )}
        {work.rectangle === "help_service_from_helper" && (
          <img src="/icons/help_service_from_helper.svg" />
        )}
        <p className="title ellipsis">{work.title}</p>
      </div>

      <div className="info flex-grow-1 ">
        <div className="row">
          <div className="col-6 p-1">
            <div className="info-item">
              <img src="icons/title.svg" />
              <p> {work.category_title} </p>
            </div>
          </div>
          <div className="col-6 p-1">
            <div className="info-item">
              <i className="fa-light fa-calendar"></i> <p>{work.start_date}</p>
            </div>
          </div>
          {work.offers_count > 0 && (
            <div className="col-6 p-1 ">
              <div className="info-item">
                <img src="/icons/offers-icon.svg" />
                <p>{work.offers_count} عروض مقدمة</p>
              </div>
            </div>
          )}
        </div>
      </div>
      {!withoutStatus && <WorkProgress steps={progressSteps} />}
      {work.status === "completed" && (
        <div
          className={`status-info m-0  ${
            work.status !== "completed" ? "not-completed" : "completed"
          }`}
        >
          <span>
            {work.status === "planning" && " بانتظار بدء خطة التنفيذ"}
            {work.status === "offers" && "بانتظار قبول العرض المناسب"}
            {work.status === "execution" && " بانتظار خطة التنفيذ"}
            {work.status === "payment" && "تم الدفع وبإنتظار بدء خطة التنفيذ"}
            {work.status === "completed" && "مكتمل"}
          </span>
          <span>{work.status_date}</span>
        </div>
      )}
    </Link>
  );
}
