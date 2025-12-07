import { Modal, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import CustomButton from "../../ui/CustomButton";

const DeleteAccountModal = ({
  showDeleteModal,
  setShowDeleteModal,
  showAlertModal,
  setShowAlertModal,
}) => {
  const { t } = useTranslation();
  const handleCancel = () => {
    setShowDeleteModal(false);
  };
  const handleConfirm = () => {
    setShowDeleteModal(false);
    setShowAlertModal(true);
  };
  return (
    <Modal
      show={showDeleteModal}
      onHide={handleCancel}
      centered
      size="md"
      className="delete-account-modal"
    >
      <Modal.Header closeButton className="border-0 pb-0">
        <Modal.Title className="text-modal-orange fw-bold">
          {t("dashboard.deleteAccountModal.deleteAccount")}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="p-3">
        <>
          <p className="text-muted mb-4">
            {t("dashboard.deleteAccountModal.sorryToSeeYouGo")}
          </p>

          <div className="requirements-section ">
            <span className="text-muted">
              {t("dashboard.deleteAccountModal.beforeProceeding")}{" "}
            </span>

            <div className=" my-3 ">
              <span className=" text-modal-orange">
                {t("dashboard.deleteAccountModal.noActiveContracts")}
              </span>
              <span className="text-muted small mb-0 px-1">
                {t("dashboard.deleteAccountModal.noActiveContractsDescription")}
              </span>
            </div>

            <div className="text-modal-orange mb-3">
              <span className=" text-modal-orange">
                {t(
                  "dashboard.deleteAccountModal.stopPersonalAssistantCommunity"
                )}
              </span>

              <span className="text-muted small mb-0 px-1">
                {t("dashboard.deleteAccountModal.stopCommunityDescription")}
              </span>
            </div>

            <div className="text-modal-orange">
              <span className=" text-modal-orange">
                {t("dashboard.deleteAccountModal.withdrawAllBalance")}
              </span>
              <span className="text-muted small mb-0 px-1">
                {t("dashboard.deleteAccountModal.withdrawBalanceDescription")}
              </span>
            </div>
          </div>

          <div className="my-3">
            <p className=" mb-0">
              {t("dashboard.deleteAccountModal.irreversibleActionWarning")}
            </p>
          </div>
        </>
      </Modal.Body>

      <div className="buttons w-100 p-4">
        <CustomButton
          size="large"
          fullWidth
          color="fire"
          variant="outlined"
          onClick={handleCancel}
          style={{ width: "70%" }}
        >
          {t("dashboard.deleteAccountModal.cancel")}
        </CustomButton>
        <CustomButton
          size="large"
          fullWidth
          color="fire"
          onClick={handleConfirm}
          style={{ width: "30%" }}
        >
          {t("dashboard.deleteAccountModal.continue")}
        </CustomButton>
      </div>
    </Modal>
  );
};

export default DeleteAccountModal;
