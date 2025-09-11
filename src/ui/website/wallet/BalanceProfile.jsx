import { useState } from "react";
import { useSelector } from "react-redux";
import Currency from "../../Currency";
import CustomButton from "../../CustomButton";
import { useTranslation } from "react-i18next";
import ChargeBalanceModal from "../../modals/ChargeBalanceModal";
import RefundRequestModal from "./RefundRequestModal";

export default function BalanceProfile() {
  const { t } = useTranslation();
  const [showChargeModal, setShowChargeModal] = useState(false);
  const [showRefundModal, setShowRefundModal] = useState(false);
  const { user } = useSelector((state) => state.authRole);
  return (
    <div className="wallet-balance">
      <div className="wallet-header">
        <h5>{t("profile.balance")}</h5>
      </div>

      <h2 className="balance-amount">
        <span>{user?.available_balance} </span>
        <Currency style={{ width: "28px", height: "32px" }} />
      </h2>

      <div className="wallet-actions">
        <CustomButton size="large" onClick={() => setShowChargeModal(true)}>
          {t("profile.charge")}
        </CustomButton>

        <CustomButton
          variant="outlined"
          size="large"
          onClick={() => setShowRefundModal(true)}
        >
          {t("profile.refundReq")}
        </CustomButton>
      </div>

      <ChargeBalanceModal
        showModal={showChargeModal}
        setShowModal={setShowChargeModal}
      />
      <RefundRequestModal
        showModal={showRefundModal}
        setShowModal={setShowRefundModal}
      />
    </div>
  );
}
