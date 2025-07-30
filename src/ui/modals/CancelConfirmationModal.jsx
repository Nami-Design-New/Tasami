import { Modal } from "react-bootstrap";
import { useState } from "react";

export default function CancelConfirmationModal({ show, onClose }) {
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleConfirm = () => {
    setIsConfirmed(true);
    setTimeout(() => {
      onClose();
      setIsConfirmed(false);
    }, 2000); 
  };

  return (
    <Modal show={show} onHide={onClose} centered className="cancel-modal">
      <Modal.Body >
        {!isConfirmed ? (
          <>
            <img src="/icons/warn.svg" alt="Alert" width={60} />
            <h5 className="title my-3">هل أنت متأكد؟</h5>
            <p className="mb-4">
              سيتم إلغاء طلب التعاقد ويمكنك لاحقًا إعادة الطلب من المساعد مرة أخرى
            </p>

            <div className="d-flex justify-content-center gap-3">
              <button className="btn btn-outline-danger" onClick={onClose}>
                إلغاء
              </button>
              <button className="btn btn-danger" onClick={handleConfirm}>
                نعم
              </button>
            </div>
          </>
        ) : (
          <>
            <img src="/icons/success.svg" alt="Success" width={60} />
            <h5 className=" my-3">تم إلغاء الطلب بنجاح</h5>
          </>
        )}
      </Modal.Body>
    </Modal>
  );
}
