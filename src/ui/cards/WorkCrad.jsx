import { useTranslation } from "react-i18next";
import WorkProgress from "../website/my-works/WorkProgress";
import { Link } from "react-router";

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
  } else {
    steps = [
      { key: "offers", label: t("works.status.offers") },
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
  console.log(withoutStatus);

  return (
    <Link to={`/my-works/${work.id}`} className="work-card">
      <div className="work-title">
        {work.rectangle === "personal_goal_with_helper" && (
          <img src="/icons/triangle-with-helper.svg" />
        )}
        {work.rectangle === "personal_goal" && (
          <img src="/icons/triangle-without-helper.png" />
        )}
        <p className="title ellipsis">{work.title}</p>
      </div>

      <div className="info">
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
                <img src="/icons/offers-icon.svg" />{" "}
                <p>{work.offers_count} عروض مقدمة</p>
              </div>
            </div>
          )}
        </div>
      </div>
      {!withoutStatus && <WorkProgress steps={progressSteps} />}
    </Link>
  );
}
