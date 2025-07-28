import { Modal } from "react-bootstrap";
import InputField from "../../forms/InputField";
import CustomButton from "../../CustomButton";

export default function ViolationsEditModal({
  showModal,
  setShowModal,
  isEdit,
}) {
  return (
    <Modal
      show={showModal}
      size="md"
      onHide={() => setShowModal(false)}
      centered
    >
      <Modal.Header closeButton>
        {isEdit ? "تعديل" : "اضافه"} المخالفه
      </Modal.Header>
      <Modal.Body>
        <form className="form_ui">
          <div className="row">
            <div className="col-12 p-2">
              <InputField label="عنوان المخالفة" />
            </div>
            <div className="col-12 p-2">
              <CustomButton fullWidth size="large">
                {isEdit ? "تعديل " : "  اضافة "}{" "}
              </CustomButton>
            </div>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}
