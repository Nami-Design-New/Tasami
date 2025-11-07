import { t } from "i18next";
import Currency from "../../Currency";
import CustomButton from "../../CustomButton";

export default function PlanCard({ plan, setSelectedPlan, setShowModal }) {
  return (
    <div className="plan-card">
      <div className="plan">
        <img src={plan?.image} alt="" />
        <h3>{plan?.title}</h3>
      </div>
      <ul className="plan-features">
        <li>
          <p> {t("website.platform.subscription.appCommission")}</p>
          <span>{plan?.app_commission}%</span>
        </li>
      </ul>
      <div className="plan-card-foot">
        <CustomButton
          fullWidth
          size="large"
          style={{ backgroundColor: "#4ECDC4" }}
          onClick={() => {
            setShowModal(true);
            setSelectedPlan(plan);
          }}
        >
          {t("website.platform.subscribe")}
        </CustomButton>
        <div className="price">
          <p className="total">
            <span>{plan.price}</span> <Currency />
          </p>
          <p className="monthly">
            <span>
              {plan?.type === "half_yearly"
                ? Number(plan?.price / 6).toFixed(0)
                : Number(plan?.price / 12).toFixed(0)}
            </span>
            <Currency /> <span>{t("monthly")}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
