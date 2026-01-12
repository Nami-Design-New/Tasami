import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import CustomButton from "../../../CustomButton";
import alertIcon from "../../../../assets/icons/alert.svg";
export default function AlertModal({
  showModal,
  setShowModal,
  noActions = false,
  confirmButtonText,
  onConfirm,
  loading = false,
  children,
  withoutMessage = true,
  showCancel = true,
}) {
  const { t } = useTranslation();
  const handleCancel = () => {
    setShowModal(false);
  };
  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    // setShowModal(false);
  };
  console.log(loading);
  return (
    <Modal show={showModal} onHide={handleCancel} centered size="md">
      <Modal.Body>
        <div className="alert-modal">
          <img src={alertIcon} alt="alert" />

          {withoutMessage && (
            <h4> {t("website.platform.myCommunity.areYouSure")}</h4>
          )}

          {children}

          {!noActions && (
            <div className="buttons justify-content-end  w-100">
              {showCancel && (
                <CustomButton
                  size="large"
                  fullWidth
                  color="fire"
                  variant="outlined"
                  onClick={handleCancel}
                  style={{ width: "70%" }}
                >
                  {t("cancel")}
                </CustomButton>
              )}
              <CustomButton
                size="large"
                fullWidth
                color="fire"
                onClick={handleConfirm}
                loading={loading}
                style={{ width: "30%" }}
              >
                {confirmButtonText}
              </CustomButton>
            </div>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
}
