import { Modal } from "react-bootstrap";
import TextField from "../forms/TextField";
import SubmitButton from "../forms/SubmitButton";

const InquiryModal = ({ showModal, setShowModal }) => {
  return (
    <Modal
      show={showModal}
      size="lg"
      onHide={() => setShowModal(false)}
      centered
    >
      <Modal.Header closeButton className="m-2">
        <h5 className="fw-bold">إضافة استفسار</h5>
      </Modal.Header>

      <Modal.Body>
        <form className="form_ui">
          <div className="row">
            <div className="col-12 p-1">
              <TextField placeholder="اكتب هنا..." id="commentText" />
            </div>
          </div>

          <div className="col-12 my-3 d-flex gap-1">
            <div className="col-6">
              <SubmitButton text="ارسال" />
            </div>
            <div className="col-6">
              <button
                type="button"
                className="cancle"
                onClick={() => setShowModal(false)}
              >
                إلغاء
              </button>
            </div>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default InquiryModal;
