import { ProgressBar } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import Currency from "../../Currency";

export default function PaymentContractData({ contract }) {
  const { t } = useTranslation();

  return (
    <div className="payment-card">
      <h3 className="card-title">{t("paymentContractDetails.title")}</h3>

      <div className="card-body">
        <ul className="payment-list">
          <li className="total-amount">
            <h6>{t("paymentContractDetails.contractValue")}:</h6>
            <p>
              {contract?.total_price} <Currency />
            </p>
          </li>

          <li>
            <h6>{t("paymentContractDetails.contractDuration")}:</h6>
            <p>
              {contract?.total_days} {t("common.days")}
            </p>
          </li>

          <li>
            <h6>{t("paymentContractDetails.dailyHelperPrice")}:</h6>
            <p>
              {contract?.day_price} <Currency />
            </p>
          </li>

          <li>
            <h6>{t("paymentContractDetails.receivedAmount")}:</h6>
            <p>
              {contract?.received_money} <Currency />
            </p>
          </li>

          <li>
            <h6>{t("paymentContractDetails.remainingBalance")}:</h6>
            <p>
              {contract?.reminder_money} <Currency />
            </p>
          </li>

          <li className="progress-payment">
            <h6>{t("paymentContractDetails.progress")}</h6>

            <div className="progress-data">
              <span>
                {contract?.total_days} {t("common.days")}
              </span>
              <span>
                {contract?.progress_days} {t("common.days")}
              </span>
            </div>

            <ProgressBar now={contract?.progress_percent || 0} />
          </li>
        </ul>
      </div>
    </div>
  );
}
