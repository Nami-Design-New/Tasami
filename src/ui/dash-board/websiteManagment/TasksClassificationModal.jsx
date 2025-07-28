import { Modal } from "react-bootstrap";
import CustomButton from "../../CustomButton";
import InputField from "../../forms/InputField";

export default function TasksClassificationModal({
  showModal,
  setShowModal,
  isEdit,
}) {
  return (
    <Modal
      show={showModal}
      size="md"
      onHide={() => {
        setShowModal(false);
      }}
      centered
    >
      <Modal.Header closeButton>
        {isEdit ? "تعديل" : "اضافه"} التصنيف{" "}
      </Modal.Header>
      <Modal.Body>
        <form className="form_ui">
          <div className="row">
            <div className="col-12 p-2">
              <InputField label="تصنيف" placeholder="" />
            </div>

            <div className="col-12 p-2">
              <div className="d-flex align-items-center gap-2    justify-content-end  ">
                <CustomButton
                  onClick={() => setShowModal(false)}
                  size="large"
                  color="secondary"
                  type="button"
                >
                  الغاء
                </CustomButton>

                <CustomButton size="large" type="submit">
                  {isEdit ? "تعديل " : "  اضافة "}{" "}
                </CustomButton>
              </div>
            </div>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}
