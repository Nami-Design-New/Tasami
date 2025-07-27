import { Modal } from "react-bootstrap";
import SubmitButton from "../forms/SubmitButton";

const ChargeBalanceModal = ({ showModal, setShowModal }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("تم شحن الرصيد!");
    setShowModal(false);
  };

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)} centered>
      <Modal.Header closeButton>
        <h5>شحن الرصيد</h5>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div className="form-group position-relative mb-3">
            <label htmlFor="charge" className="form-label">
              المبلغ
            </label>
             <img
              src="/icons/ryal.svg"
              alt="ريال"
              className="input-icon"
            />
            <input
              type="number"
              className="form-control"
              id="charge"
              placeholder="أدخل المبلغ"
              required
            />
           
          </div>

          <div className="text-end">
            <SubmitButton text="تأكيد الشحن" />
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default ChargeBalanceModal;
