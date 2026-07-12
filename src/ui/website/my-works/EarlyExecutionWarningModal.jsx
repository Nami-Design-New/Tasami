import { useTranslation } from "react-i18next";

import alertIcon from "../../../assets/icons/alert.svg";
import CustomButton from "../../CustomButton";
import GlobalModal from "../../GlobalModal";

export default function EarlyExecutionWarningModal({
  showModal,
  onCancel,
  onContinue,
  loading,
  scheduledDate,
  daysUntilStart,
}) {
  const { t } = useTranslation();

  return (
    <GlobalModal
      show={showModal}
      centered
      onHide={onCancel}
      className="early-execution-warning-modal"
    >
      <GlobalModal.Body>
        <div className="early-execution-warning">
          <img src={alertIcon} alt="" aria-hidden="true" />

          <h2>{t("works.myTasks.earlyStart.title")}</h2>

          <div className="early-execution-warning__message">
            <p>
              {t("works.myTasks.earlyStart.scheduledFor")} {" "}
              <strong>{scheduledDate}</strong>{" "}
              {t("works.myTasks.earlyStart.daysRemaining", {
                count: daysUntilStart,
              })}
            </p>
            <p>{t("works.myTasks.earlyStart.description")}</p>
          </div>

          <div className="early-execution-warning__actions">
            <CustomButton
              color="fire"
              size="large"
              onClick={onContinue}
              loading={loading}
            >
              {t("works.myTasks.earlyStart.continue")}
            </CustomButton>
            <CustomButton
              color="fire"
              size="large"
              variant="outlined"
              onClick={onCancel}
              disabled={loading}
            >
              {t("works.myTasks.earlyStart.cancel")}
            </CustomButton>
          </div>
        </div>
      </GlobalModal.Body>
    </GlobalModal>
  );
}
