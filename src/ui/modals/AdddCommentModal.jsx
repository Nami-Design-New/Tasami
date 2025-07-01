import { Modal } from "react-bootstrap";
import TextField from "../../ui/forms/TextField";
import SubmitButton from "../../ui/forms/SubmitButton";

const AddCommentModal = ({ showModal, setShowModal }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("تم إضافة التعليق!");
    setShowModal(false);
  };

  return (
    <Modal show={showModal} size="lg" onHide={() => setShowModal(false)} centered>
      <Modal.Header closeButton className="m-2">
        <h5 className="fw-bold">إضافة تعليق</h5>
      </Modal.Header>

      <Modal.Body>
        <form className="form_ui" onSubmit={handleSubmit}>
          <div className="row">
          

            <div className="col-12 p-1">
              <TextField
                label="نص التعليق"
                placeholder="اكتب تعليقك هنا..."
                id="commentText"
              />
            </div>
          </div>

          <div className="mt-3 text-end">
            <SubmitButton text="إرسال التعليق" />
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default AddCommentModal;
