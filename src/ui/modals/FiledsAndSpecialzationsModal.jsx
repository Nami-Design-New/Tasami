import { Modal } from "react-bootstrap";
import InputField from "../forms/InputField";
import SubmitButton from "../forms/SubmitButton";

const FiledsAndSpecialzationsModal = ({ showModal, setShowModal }) => {
  return (
    <Modal
      show={showModal}
      size="lg"
      onHide={() => setShowModal(false)}
      aria-labelledby="working group add / edit Modal"
      centered
    >
      <Modal.Header closeButton>
        <h6>تعديل المجال</h6>
      </Modal.Header>
      <Modal.Body>
        <form className="form_ui ">
          <div className="row g-3">
            <div className="col-12 col-md-6">
              <InputField label=" المجال " />
            </div>
            <div className="col-12 col-md-6">
              <InputField label=" التخصص " />
            </div>
            <div className="col-12 ">
              <SubmitButton text=" تاكيد و اضافه " />
            </div>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default FiledsAndSpecialzationsModal;
