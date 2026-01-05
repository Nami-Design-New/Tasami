import { Modal } from "react-bootstrap";

export default function ToastSuccessModal({
  showModal,
  setShowModal,
  title,
  children,
}) {
  return (
    <Modal
      show={showModal}
      size="md"
      centered
      onHide={() => setShowModal(false)}
    >
      <Modal.Header closeButton>
        <h6>{title}</h6>
      </Modal.Header>
      <Modal.Body>
        <div className="p-2">{children}</div>
      </Modal.Body>
    </Modal>
  );
}
