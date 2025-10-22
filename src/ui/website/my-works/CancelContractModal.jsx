import { Modal } from "react-bootstrap";
import useGetCancelReasons from "../../../hooks/website/MyWorks/useGetCancelReasons";

export default function CancelContractModal({ showModal, setShowModal }) {
  const { cancelReasons, isLaoding } = useGetCancelReasons();
  return (
    <Modal show={showModal} onHide={() => setShowModal(false)} centered>
      <Modal.Header closeButton>إلغاء الطلب</Modal.Header>
      <Modal.Body>
        <form className="form_ui"></form>
      </Modal.Body>
    </Modal>
  );
}
