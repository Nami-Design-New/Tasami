import { useTranslation } from "react-i18next";
import PlanCardLoader from "../../loading/PlanCardLoader";
import useGetCurrentPackage from "../../../hooks/website/subscribe/useGetCurrentPackage";

export default function CurrentPlan() {
  const { t } = useTranslation();
  const { currentPackage, isLoading } = useGetCurrentPackage();

  if (isLoading) return <PlanCardLoader />;

  return (
    <div className="subscription-current-plan ">
      <h2 className="subscription-header">
        {t("website.platform.subscription.currentPlan")}
      </h2>

      {/* Plan Card */}
      <div className="plan-header ">
        <div className="plan-info ">
          <img
            src={currentPackage?.package?.image}
            alt="plan"
            className="plan-icon"
          />
          <span className="account-type">{currentPackage?.package?.title}</span>
        </div>
        {currentPackage.package.type === "free" ? (
          <span className="plan-duration">
            {t("website.platform.subscription.freeForever")}
          </span>
        ) : (
          ""
        )}
      </div>

      {/* Features List */}
      <ul className="features-list ">
        <li className="feature-item ">
          <p className="feature-text">
            {t("website.platform.subscription.offersCount")}
          </p>
          <span className="feature-value">
            {currentPackage?.package?.offers_count}
          </span>
        </li>
        <li className="feature-item ">
          <p className="feature-text">
            {t("website.platform.subscription.groupsCount")}
          </p>
          <span className="feature-value">
            {currentPackage?.package?.groups_count}
          </span>
        </li>
        <li className="feature-item ">
          <p className="feature-text">
            {t("website.platform.subscription.seatsCount")}
          </p>
          <span className="feature-value">
            {currentPackage?.package?.seats_count}
          </span>
        </li>
        <li className="feature-item ">
          <p className="feature-text">
            {t("website.platform.subscription.appCommission")}
          </p>
          <span className="feature-value">
            {currentPackage?.package?.app_commission}%
          </span>
        </li>
      </ul>
    </div>
  );
}
