import Modal from "react-bootstrap/Modal";
import SubmitButton from "../forms/SubmitButton";

const ConfirmDeleteModal = ({
  showDeleteModal,
  setShowDeleteModal,
  deletionTarget,
  loading,
  onConfirm,
}) => {
  return (
    <Modal
      show={showDeleteModal}
      onHide={() => setShowDeleteModal(false)}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <div className="row confirmation_modal">
          <div className="col-12 p-2">
            <p className="text-center">
              {/* {`You are about to remove `} <span>{deletionTarget}</span>{" "}
              {`. When you continue, you cannot go
              back. Do you want to confirm the deletion?`} */}
              أنت على وشك الحذف. عند المتابعة، لن تتمكن من العودة. هل تريد تأكيد
              الحذف؟
            </p>
          </div>
          <div className="col-12 p-2 d-flex gap-2">
            <button
              className="cancel"
              onClick={() => setShowDeleteModal(false)}
            >
              Cancel
            </button>
            <SubmitButton
              text={"Confirm"}
              className="confirm red"
              loading={loading}
              event={onConfirm}
            />
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ConfirmDeleteModal;
