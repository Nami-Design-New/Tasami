import { useState } from "react";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import Currency from "../../Currency";
import CustomButton from "../../CustomButton";
import { useQueryClient } from "@tanstack/react-query";
import useSubscripePackage from "../../../hooks/website/subscribe/useSubscripePackage";
import { useSelector } from "react-redux";

export default function PaymentModal({ plan, showModal, setShowModal }) {
  const { t } = useTranslation();
  const { user } = useSelector((state) => state.authRole);
  const [selectedMethod, setSelectedMethod] = useState("online");
  const { subscribe, isPending } = useSubscripePackage();
  const queryClient = useQueryClient();

  async function handleSubscribe() {
    subscribe(
      { packageId: plan?.id, paymentMethod: selectedMethod },
      {
        onSuccess: (res) => {
          if (selectedMethod === "online") {
            const url = res.data.redirect_url;
            window.open(url, "_blank", "noopener,noreferrer");
          }
          queryClient.invalidateQueries({ queryKey: ["current-package"] });
          queryClient.invalidateQueries({ queryKey: ["get-packages"] });
          setSelectedMethod("online");
          setShowModal(false);

          if (selectedMethod === "wallet") {
            toast.success(res?.message);
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
            الرجاء دفع قيمة الاستراك باقة الذهب والتي تقدر بـ
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
            <span className="payment-method-title">دفع الكتروني</span>
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
            <span className="payment-method-title">محفظة</span>
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
          تأكيد الدفع
        </CustomButton>
      </Modal.Body>
    </Modal>
  );
}
