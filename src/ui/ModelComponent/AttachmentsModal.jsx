import InputField from "../forms/InputField";
import SubmitButton from "../forms/SubmitButton";
import GlobalModal from "../GlobalModal";

const AttachmentsModal = ({
  showModal,
  setShowModal,
  titleInput,
  setTitleInput,
  handleSave,
}) => {
  return (
    <GlobalModal
      centered
      size="md"
      show={showModal}
      onHide={() => setShowModal(false)}
    >
      <GlobalModal.Header closeButton>
        <h6> اضف عنوان للمرفق </h6>
      </GlobalModal.Header>
      <GlobalModal.Body>
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
      </GlobalModal.Body>
    </GlobalModal>
  );
};

export default AttachmentsModal;
