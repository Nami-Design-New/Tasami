import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import useAcceptOrRemoveWorkOffer from "../../../../hooks/website/MyWorks/offers/useAcceptOrRemoveWorkOffer";
import Currency from "../../../Currency";
import CustomButton from "../../../CustomButton";

export default function OfferPaymentModal({
  plan,
  showModal,
  setShowModal,
  setShowOfferModal,
}) {
  const { t } = useTranslation();
  const { user } = useSelector((state) => state.authRole);
  const { id: workId } = useParams();
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState("online");
  const { acceptOrRemoveWorkOffer, isPending } = useAcceptOrRemoveWorkOffer();
  const queryClient = useQueryClient();

  const handleAcceptOffers = () => {
    const payload = {
      status: "accepted",
      offer_id: plan?.id,
      payment_method: selectedMethod,
    };
    acceptOrRemoveWorkOffer(payload, {
      onSuccess: (res) => {
        toast.success(res?.message);
        setShowModal(false);
        console.log("payment success");
        setSelectedMethod("online");
        setShowOfferModal(false);
        queryClient.invalidateQueries({ queryKey: ["work-offers"] });
        queryClient.refetchQueries({ queryKey: ["work-details"] });
        queryClient.refetchQueries({ queryKey: ["assistants"] });
        queryClient.refetchQueries({ queryKey: ["work-group"] });
        navigate(`/my-works/${workId}/group`);
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
      <Modal.Header closeButton className="payment-modal-header">
        {t("website.payment")}
      </Modal.Header>

      <Modal.Body className="payment-modal-body">
        <div className="payment-modal-header">
          <h1 className="payment-modal-heading">
            {t("website.platform.subscription.offerPayMessage", {
              plan: plan?.title,
            })}
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
          onClick={handleAcceptOffers}
          fullWidth
          size="large"
        >
          {t("website.platform.subscription.confirm")}
        </CustomButton>
      </Modal.Body>
    </Modal>
  );
}
