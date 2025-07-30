import { Modal } from "react-bootstrap";
import { useState } from "react";
import SubmitButton from "../forms/SubmitButton";

const PaymentModal = ({
  showModal,
  setShowModal,
  amount = 2000,
  walletBalance = 2500,
}) => {
  const [paymentMethod, setPaymentMethod] = useState("card");

  const handleConfirm = () => {
    setShowModal(false);
  };

  return (
    <Modal
      show={showModal}
      onHide={() => setShowModal(false)}
      centered
      className="payment-modal"
    >
      <Modal.Header closeButton>
        <h5 className="fw-bold ">الدفع</h5>
      </Modal.Header>

      <Modal.Body>
        <div className="text-center mb-4">
          <p>الرجاء دفع قيمة المساعدة</p>
          <h3 className="fw-bold text-black">
            {amount.toLocaleString()}{" "}
            <span className="text-secondary">
              <img src="/icons/ryal.svg" alt="ryal" width="20"/>
            </span>
          </h3>
        </div>

        <div
          className="payment-option mb-3"
          onClick={() => setPaymentMethod("card")}
        >
          <div className={`option-box ${paymentMethod === "card" ? "active" : ""}`}>
            <img src="/icons/mastercard.svg" alt="card" width="30" />
            <span>دفع الكتروني</span>
          </div>
        </div>

        <div
          className="payment-option mb-4"
          onClick={() => setPaymentMethod("wallet")}
        >
          <div className={`option-box ${paymentMethod === "wallet" ? "active" : ""}`}>
            <img src="/icons/wallet.svg" alt="wallet" width="30" />
            <span>محفظة</span>
            <span className="ms-auto">
              {walletBalance.toLocaleString()}{" "}
              <img src="/icons/ryal.svg" alt="ryal" />
            </span>
          </div>
        </div>

        <SubmitButton text="تأكيد الدفع" onClick={handleConfirm} />
      </Modal.Body>
    </Modal>
  );
};

export default PaymentModal;
