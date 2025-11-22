import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import HelperCard from "../../../../cards/HelperCard";
import WorkProgress from "../../../my-works/WorkProgress";

export default function ContractCard({ contract, withoutStatus = true }) {
  let steps;
  const { t } = useTranslation();
  if (contract.rectangle === "personal_goal") {
    steps = [
      { key: "planning", label: t("works.status.plan") },
      {
        key: "execution",
        label: t("works.status.start"),
      },
    ];
  } else if (contract.rectangle === "personal_goal_with_helper") {
    steps = [
      { key: "offer_sent", label: t("works.status.offerSent") },
      { key: "accOffers", label: t("works.status.accOffer") },
      { key: "payment", label: t("works.status.payment") },
      { key: "planning", label: t("works.status.plan") },
      {
        key: "execution",
        label: t("works.status.start"),
      },
    ];
  } else {
    steps = [
      { key: "wait_helper_to_accept", label: t("works.status.requestOffer") },
      { key: "wait_for_user_payment", label: t("works.status.request") },
      { key: "payment", label: t("works.status.payment") },
      { key: "planning", label: t("works.status.plan") },
      {
        key: "execution",
        label: t("works.status.start"),
      },
    ];
  }
  const currentIndex = steps.findIndex((s) => s.key === contract.status);
  const progressSteps = steps.map((step, index) => ({
    ...step,
    completed: index <= currentIndex && contract.status !== "canceled",
    current: index === currentIndex && contract.status !== "canceled",
  }));

  return (
    <Link to={`/my-contracts/${contract.id}`} className="work-card">
      <HelperCard helper={contract?.user} canNavigate={false} />
      <div className="work-title">
        {" "}
        {contract.rectangle === "personal_goal_with_helper" && (
          <img src="/icons/triangle-with-helper.svg" />
        )}
        {contract.rectangle === "personal_goal" && (
          <img src="/icons/triangle-without-helper.png" />
        )}
        {contract.rectangle === "help_service_from_helper" && (
          <img src="/icons/help_service_from_helper.svg" />
        )}
        <p className="title ellipsis">{contract.title}</p>
      </div>{" "}
      <div className="info flex-grow-1 ">
        <div className="row">
          {" "}
          <div className="col-6 p-1">
            <div className="info-item">
              <img src="/icons/title.svg" />
              <p> {contract.category_title} </p>
            </div>
          </div>
          <div className="col-6 p-1">
            <div className="info-item">
              <i className="fa-light fa-calendar"></i>{" "}
              <p>{contract.start_date}</p>
            </div>
          </div>
        </div>
      </div>
      {withoutStatus && <WorkProgress steps={progressSteps} />}
    </Link>
  );
}
