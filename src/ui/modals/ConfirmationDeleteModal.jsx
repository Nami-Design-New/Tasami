import Modal from "react-bootstrap/Modal";
import CustomButton from "../CustomButton";
import { useTranslation } from "react-i18next";

const ConfirmDeleteModal = ({
  showDeleteModal,
  setShowDeleteModal,
  deletionTarget,
  message,
  loading,
  onConfirm,
}) => {
  const { t } = useTranslation();

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
              {message || t("dashboard.confirmModal.message")}
            </p>
          </div>

          <div className="col-12 p-2 d-flex gap-2">
            <CustomButton
              color="white"
              fullWidth
              style={{ border: "1px solid #000" }}
              onClick={() => setShowDeleteModal(false)}
            >
              {t("dashboard.confirmModal.cancel")}
            </CustomButton>

            <CustomButton
              fullWidth
              color="danger"
              onClick={onConfirm}
              loading={loading}
              disabled={loading}
            >
              {t("dashboard.confirmModal.delete")}
            </CustomButton>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ConfirmDeleteModal;
