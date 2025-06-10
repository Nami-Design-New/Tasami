import { Modal } from "react-bootstrap";
import TextField from "../forms/TextField";
import SubmitButton from "../forms/SubmitButton";

const UpdateDataModal = ({ showModal, setShowModal }) => {
  return (
    <Modal
      show={showModal}
      size="lg"
      onHide={() => setShowModal(false)}
      centered
    >
      <Modal.Header closeButton>
        <h6>طلب تحديث البيانات</h6>
      </Modal.Header>
      <Modal.Body>
        <form className="form_ui">
          <p className="text-muted mb-2 ">
            سيتم مراجعة طلبك من قبل الادارة وسيتم التواصل معك في حال الموافقة في
            حال الموافقة سيتم تحديث بياناتك في النظام
          </p>
          <TextField label={"سبب التحديث"} />
          <SubmitButton text="ارسال الطلب" className={"mt-3"} />
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default UpdateDataModal;
