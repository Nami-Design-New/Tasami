import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import useGetWallaetBalance from "../../../hooks/website/wallet/useGetWallaetBalance";
import Currency from "../../Currency";
import CustomButton from "../../CustomButton";
import ChargeBalanceModal from "../../modals/ChargeBalanceModal";
import WithdrawModal from "./WithdrawModal";

export default function BalanceProfile() {
  const { t } = useTranslation();
  const [showChargeModal, setShowChargeModal] = useState(false);
  const [showRefundModal, setShowRefundModal] = useState(false);
  const { user } = useSelector((state) => state.authRole);
  const { balance, isLoading } = useGetWallaetBalance(user?.id);

  return (
    <div className="wallet-balance">
      <div className="wallet-header">
        <h5>{t("profile.balance")}</h5>
      </div>

      <h2 className="balance-amount">
        <span>{balance?.available_balance} </span>
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
      <WithdrawModal
        showModal={showRefundModal}
        setShowModal={setShowRefundModal}
      />
    </div>
  );
}
