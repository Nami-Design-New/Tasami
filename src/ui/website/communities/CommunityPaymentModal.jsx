import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import useJoinCommunity from "../../../hooks/website/communities/useJoinCommunity";
import Currency from "../../Currency";
import CustomButton from "../../CustomButton";

export default function CommunityPaymentModal({
  community,
  showModal,
  setShowModal,
}) {
  console.log(community);

  const { t } = useTranslation();
  const { user } = useSelector((state) => state.authRole);
  const [selectedMethod, setSelectedMethod] = useState("online");
  const { joinCommunity, isPending: isJoinPending } = useJoinCommunity();
  const queryClient = useQueryClient();

  async function handleSubscribe() {
    joinCommunity(
      { community_id: community?.id, payment_method: selectedMethod },
      {
        onSuccess: (res) => {
          if (selectedMethod === "online") {
            const url = res.data.redirect_url;
            window.open(url, "_blank", "noopener,noreferrer");
          }
          queryClient.invalidateQueries({
            queryKey: ["community-details"],
          });
          // queryClient.invalidateQueries({ queryKey: ["get-packages"] });
          setSelectedMethod("online");
          setShowModal(false);

          if (selectedMethod === "wallet") {
            toast.success(res?.message);
            queryClient.invalidateQueries({
              queryKey: ["community-details"],
            });
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
        {t("website.payment")}
      </Modal.Header>

      <Modal.Body className="payment-modal-body">
        <div className="payment-modal-header">
          <h1 className="payment-modal-heading">
            {t("payMessage", {
              plan: community?.helper?.name,
            })}{" "}
          </h1>
          <p className="payment-modal-price">
            {community?.price} <Currency style={{ height: "22px" }} />
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
              <img src="/icons/wallet-image.svg" />
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
          loading={isJoinPending}
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
