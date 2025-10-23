import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import HelperCard from "../../../../cards/HelperCard";
import WorkProgress from "../../../my-works/WorkProgress";

export default function ContractCard({ contract, withoutStatus = true }) {
  console.log("contract cradt :", contract);
  const { t } = useTranslation();
  const steps = [
    { key: "offers", label: t("works.status.offers") },
    { key: "planning", label: t("works.status.accOffer") },
    { key: "payment", label: t("works.status.payment") },
    { key: "planning", label: t("works.status.plan") },
    {
      key: "execution",
      label: t("works.status.start"),
    },
  ];
  const currentIndex = steps.findIndex((s) => s.key === contract.status);
  const progressSteps = steps.map((step, index) => ({
    ...step,
    completed: index <= currentIndex && contract.status !== "canceled",
    current: index === currentIndex && contract.status !== "canceled",
  }));
  return (
    <Link to={`/my-contracts/${contract.id}`} className="work-card">
      <HelperCard helper={contract?.helper} />
      <div className="work-title">
        {" "}
        {contract.rectangle === "personal_goal_with_helper" && (
          <img src="/icons/triangle-with-helper.svg" />
        )}
        {contract.rectangle === "personal_goal" && (
          <img src="/icons/triangle-without-helper.png" />
        )}
        {contract.rectangle === "help_service_from_helper" && (
          <img src="/icons/triangle-without-helper.png" />
        )}
        <p className="title ellipsis">{contract.title}</p>
      </div>{" "}
      <div className="info flex-grow-1 ">
        <div className="row">
          {" "}
          <div className="col-6 p-1">
            <div className="info-item">
              <img src="icons/title.svg" />
              <p> {contract.category_title} </p>
            </div>
          </div>{" "}
          <div className="col-6 p-1">
            <div className="info-item">
              <i className="fa-light fa-calendar"></i>{" "}
              <p>{contract.start_date}</p>
            </div>
          </div>
        </div>
      </div>{" "}
      {withoutStatus && <WorkProgress steps={progressSteps} />}
    </Link>
  );
}
