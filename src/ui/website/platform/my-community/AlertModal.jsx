import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import CustomButton from "../../../CustomButton";

export default function AlertModal({
  showModal,
  setShowModal,
  confirmButtonText,
  onConfirm,
  loading = false,
  children,
}) {
  const { t } = useTranslation();
  const handleCancel = () => {
    setShowModal(false);
  };
  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    setShowModal(false);
  };
  return (
    <Modal show={showModal} onHide={handleCancel} centered size="md">
      <Modal.Body>
        <div className="alert-modal">
          <img src="/icons/alert.svg" alt="alert" />

          <h4> {t("website.platform.myCommunity.areYouSure")}</h4>

          {children}

          <div className="buttons w-100">
            <CustomButton
              size="large"
              fullWidth
              color="fire"
              type="outlined"
              onClick={handleCancel}
            >
              {t("cancel")}
            </CustomButton>
            <CustomButton
              size="large"
              fullWidth
              color="fire"
              onClick={handleConfirm}
              loading={loading}
            >
              {confirmButtonText}
            </CustomButton>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
