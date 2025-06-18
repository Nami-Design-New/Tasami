import { Modal } from "react-bootstrap";
import InputField from "../forms/InputField";
import TextField from "../forms/TextField";

const AddActionModal = ({ showModal, setShowModal }) => {
  return (
    <Modal
      centered
      size="md"
      show={showModal}
      onHide={() => setShowModal(false)}
    >
      <Modal.Header closeButton>
        <h6> اضف افادتك </h6>
      </Modal.Header>
      <Modal.Body>
        <form className="form_ui">
          <div className="row">
            <div className="col-12 py-2">
              <InputField label="الحساب" disabled value="S-260122-000001" />
            </div>
            <div className="col-12 py-2">
              <InputField label="الموضوع" />
            </div>
            <div className="col-12 py-2">
              <TextField label="الوصف" />
            </div>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default AddActionModal;
