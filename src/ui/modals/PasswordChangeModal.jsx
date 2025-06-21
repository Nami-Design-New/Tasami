import { Modal } from "react-bootstrap";
import InputField from "../forms/InputField";
import SubmitButton from "../forms/SubmitButton";
import CustomButton from "../CustomButton";

const PasswordChangeModal = ({ showModal, setShowModal }) => {
  return (
    <Modal
      show={showModal}
      onHide={() => setShowModal(false)}
      size="md"
      centered
    >
      <Modal.Header closeButton>
        <h6> تغيير كلمه المرور</h6>
      </Modal.Header>

      <Modal.Body>
        <form className="form_ui ">
          <div className="row gy-3">
            <div className="col-12">
              <InputField
                label="كلمه المرور القديمه"
                type="password"
                // placeholder="كلمه المرور القديمه"
              />
            </div>
            <div className="col-12">
              <InputField
                label="كلمه المرور الجديده"
                type="password"
                // placeholder="كلمه المرور الجديده"
              />
            </div>
            <div className="col-12">
              <InputField
                label="تاكيد كلمه المرور"
                type="password"
                // placeholder="تاكيد كلمه المرور"
              />
            </div>
            <CustomButton size="large" fullWidth>
              تأكيد
            </CustomButton>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default PasswordChangeModal;
