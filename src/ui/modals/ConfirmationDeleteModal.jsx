import Modal from "react-bootstrap/Modal";
import CustomButton from "../CustomButton";

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
              أنت على وشك الحذف. عند المتابعة، لن تتمكن من العودة. هل تريد تأكيد
              الحذف؟
            </p>
          </div>
          <div className="col-12 p-2 d-flex  gap-2">
            <CustomButton
              color="white"
              fullWidth
              style={{ border: "1px solid #000" }}
              onClick={() => setShowDeleteModal(false)}
            >
              الغاء
            </CustomButton>
            <CustomButton fullWidth color="danger" onClick={onConfirm}>
              حذف
            </CustomButton>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ConfirmDeleteModal;
