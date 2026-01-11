import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import useMessagePaymentListener from "../../../hooks/shared/useMessagePaymentListener";
import useSubscripePackage from "../../../hooks/website/subscribe/useSubscripePackage";
import Currency from "../../Currency";
import CustomButton from "../../CustomButton";
import masterCardLogo from "../../../assets/icons/mastercard-logo.svg";
import walletImage from "../../../assets/icons/wallet-image.svg";
export default function PaymentModal({ plan, showModal, setShowModal }) {
  const { t } = useTranslation();
  const { user } = useSelector((state) => state.authRole);
  const [selectedMethod, setSelectedMethod] = useState("online");
  const { subscribe, isPending } = useSubscripePackage();
  const queryClient = useQueryClient();

  useMessagePaymentListener({
    onSuccess: () => {
      toast.success(t("payment.success"));
      queryClient.invalidateQueries({ queryKey: ["current-package"] });
      queryClient.invalidateQueries({ queryKey: ["get-packages"] });
      setSelectedMethod("online");
      setShowModal(false);
    },
    onFail: () => {
      toast.error(t("payment.failed"));
    },
  });

  async function handleSubscribe() {
    subscribe(
      { packageId: plan?.id, paymentMethod: selectedMethod },
      {
        onSuccess: (res) => {
          if (selectedMethod === "online") {
            if (res?.data?.redirect_url) {
              const width = 800;
              const height = 600;
              const left = window.screenX + (window.outerWidth - width) / 2;
              const top = window.screenY + (window.outerHeight - height) / 2;
              window.open(
                res.data.redirect_url,
                "ChargeWalletPopup",
                `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes,status=no`
              );
            }
          } else if (selectedMethod === "wallet") {
            toast.success(res?.message);
            queryClient.invalidateQueries({ queryKey: ["current-package"] });
            queryClient.invalidateQueries({ queryKey: ["get-packages"] });
            setSelectedMethod("online");
            setShowModal(false);
          }
        },
        onError: (error) => {
          toast.error(error.message);
        },
      }
    );
  }

  return (
    <Modal
      centered
      size="md"
      show={showModal}
      onHide={() => {
        setShowModal(false);
        setSelectedMethod("online");
      }}
    >
      <Modal.Header closeButton className="payment-modal-header">
        <h6> {t("website.payment")}</h6>
      </Modal.Header>

      <Modal.Body className="payment-modal-body">
        <div className="payment-modal-header">
          <h1 className="payment-modal-heading">
            {t("website.platform.subscription.payMessage", {
              plan: plan?.title,
            })}{" "}
          </h1>
          <p className="payment-modal-price">
            {plan?.price} <Currency style={{ height: "22px" }} />
          </p>
        </div>

        {/* Payment Methods */}
        <div className="payment-methods">
          {/* Online Payment */}
          <label
            className={`payment-method ${
              selectedMethod === "online" ? "active" : ""
            }`}
          >
            <div className="payment-methd-image-wrapper">
              <img src={masterCardLogo} />
            </div>
            <span className="payment-method-title">
              {" "}
              {t("website.platform.subscription.online")}
            </span>
            <input
              type="radio"
              name="payment-method"
              value="online"
              checked={selectedMethod === "online"}
              onChange={(e) => setSelectedMethod(e.target.value)}
            />
          </label>

          {/* Wallet */}
          <label
            className={`payment-method ${
              selectedMethod === "wallet" ? "active" : ""
            }`}
          >
            <div className="payment-methd-image-wrapper">
              <img src={walletImage} />
            </div>
            <span className="payment-method-title">
              {" "}
              {t("website.platform.subscription.wallet")}
            </span>
            <input
              type="radio"
              name="payment-method"
              value="wallet"
              checked={selectedMethod === "wallet"}
              onChange={(e) => setSelectedMethod(e.target.value)}
            />
            <span className="wallet-balance">
              {user?.available_balance} <Currency />
            </span>
          </label>
        </div>
        <CustomButton
          loading={isPending}
          onClick={handleSubscribe}
          fullWidth
          size="large"
        >
          {t("website.platform.subscription.confirm")}
        </CustomButton>
      </Modal.Body>
    </Modal>
  );
}
