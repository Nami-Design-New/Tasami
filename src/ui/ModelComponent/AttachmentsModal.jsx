import { Modal } from "react-bootstrap";
import InputField from "../forms/InputField";
import SubmitButton from "../forms/SubmitButton";

const AttachmentsModal = ({
  showModal,
  setShowModal,
  titleInput,
  setTitleInput,
  handleSave,
}) => {
  return (
    <Modal
      centered
      size="md"
      show={showModal}
      onHide={() => setShowModal(false)}
    >
      <Modal.Header closeButton>
        <h6> اضف عنوان للمرفق </h6>
      </Modal.Header>
      <Modal.Body>
        <form
          className="form_ui"
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
        >
          <InputField
            label="عنوان المرفق"
            type="text"
            value={titleInput}
            onChange={(e) => setTitleInput(e.target.value)}
            placeholder="أدخل عنوان المستند هنا"
          />
          <SubmitButton text="حفظ" className={"mt-3"} />
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default AttachmentsModal;
