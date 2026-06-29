import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import HelperCard from "../../../../cards/HelperCard";
import WorkProgress from "../../../my-works/WorkProgress";
import triangleWithHelper from "../../../../../assets/icons/triangle-with-helper.svg";
import triangleWithoutHelper from "../../../../../assets/icons/triangle-without-helper.png";
import helpServiceFromHelper from "../../../../../assets/icons/help_service_from_helper.svg";
import titleIcon from "../../../../../assets/icons/title.svg";
import {
  formatStartDateTimestamp,
  getStartExecutionDeadlineDebugSnapshot,
  getStartExecutionDeadlineState,
} from "../../../../../utils/startExecutionDeadline";
import StartExecutionDeadlineAlert from "../../../my-works/StartExecutionDeadlineAlert";

export default function ContractCard({ contract, withoutStatus = true }) {
  let steps;
  const { t, i18n } = useTranslation();
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
  const deadlineState = getStartExecutionDeadlineState(contract);
  const isAutoCanceled = Boolean(deadlineState?.isAutoCanceled);
  const isCanceled = contract.status === "canceled" || isAutoCanceled;
  const startDate = formatStartDateTimestamp(
    contract?.start_date_timestamp,
    i18n.language,
  );
  const currentIndex = steps.findIndex((s) => s.key === contract.status);
  const progressSteps = steps.map((step, index) => ({
    ...step,
    completed: index <= currentIndex && !isCanceled,
    current: index === currentIndex && !isCanceled,
  }));

  useEffect(() => {
    console.log(
      "[StartExecutionDeadline][ContractCard]",
      getStartExecutionDeadlineDebugSnapshot(contract),
    );
  }, [contract]);

  return (
    <Link to={`/my-contracts/${contract.id}`} className="work-card">
      {contract.code && (
        <div className={`work-reference-code ${contract.rectangle ?? ""}`}>
          {contract.code}
        </div>
      )}
      <HelperCard helper={contract?.user} canNavigate={false} />
      <div className="work-title">
        {" "}
        {contract.rectangle === "personal_goal_with_helper" && (
          <img src={triangleWithHelper} />
        )}
        {contract.rectangle === "personal_goal" && (
          <img src={triangleWithoutHelper} />
        )}
        {contract.rectangle === "help_service_from_helper" && (
          <img src={helpServiceFromHelper} />
        )}
        <p className="title ellipsis">{contract.title}</p>
      </div>{" "}
      <div className="info flex-grow-1 ">
        <div className="row">
          {" "}
          <div className="col-6 p-1">
            <div className="info-item">
              <img src={titleIcon} />
              <p> {contract.category_title} </p>
            </div>
          </div>
          <div className="col-6 p-1">
            <div className="info-item">
              <i className="fa-light fa-calendar"></i>{" "}
              <p>{startDate}</p>
            </div>
          </div>
        </div>
      </div>
      {withoutStatus && <WorkProgress steps={progressSteps} />}
      <StartExecutionDeadlineAlert item={contract} scope="contract" />
    </Link>
  );
}
