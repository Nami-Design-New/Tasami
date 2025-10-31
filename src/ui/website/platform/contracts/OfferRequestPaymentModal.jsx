import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import useOfferRequestPayment from "../../../../hooks/website/contracts/useOfferRequestPayment";
import Currency from "../../../Currency";
import CustomButton from "../../../CustomButton";
import { toast } from "sonner";

export default function OfferRequestPaymentModal({
  plan,
  workId,
  showModal,
  setShowModal,
}) {
  const queryClient = useQueryClient();
  console.log(plan);

  const [selectedMethod, setSelectedMethod] = useState("online");
  const { t } = useTranslation();
  const { user } = useSelector((state) => state.authRole);

  const { offerRequestPayment, isPending } = useOfferRequestPayment();

  const handelPayment = () => {
    const payload = {
      method: selectedMethod,
      workId,
    };
    offerRequestPayment(payload, {
      onSuccess: (res) => {
        toast.success(res.message);
        setShowModal(false);
        queryClient.refetchQueries({ queryKey: ["work-details"] });
        setSelectedMethod("online");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };
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
      {" "}
      <Modal.Header closeButton className="payment-modal-header">
        {t("website.payment")}
      </Modal.Header>{" "}
      <Modal.Body className="payment-modal-body">
        <div className="payment-modal-header">
          <h1 className="payment-modal-heading">
            {t("website.platform.subscription.offerPayMessage", {
              plan: plan?.title,
            })}
          </h1>
          <p className="payment-modal-price">
            {plan} <Currency style={{ height: "22px" }} />
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
              <img src="/icons/mastercard-logo.svg" />
            </div>
            <span className="payment-method-title">
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
              <img src="/icons/wallet-image.svg" />
            </div>
            <span className="payment-method-title">
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
          onClick={handelPayment}
          fullWidth
          size="large"
        >
          {t("website.platform.subscription.confirm")}
        </CustomButton>
      </Modal.Body>
    </Modal>
  );
}
