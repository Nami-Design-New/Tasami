import { useTranslation } from "react-i18next";
import alertIcon from "../../../../assets/icons/alert.svg";
import CustomButton from "../../../CustomButton";
import GlobalModal from "../../../GlobalModal";

export default function TaskScheduleRegenerationModal({
  show,
  loading,
  onCancel,
  onConfirm,
}) {
  const { t } = useTranslation();

  return (
    <GlobalModal show={show} centered onHide={onCancel}>
      <GlobalModal.Body>
        <div className="task-schedule-regeneration-confirmation">
          <img src={alertIcon} alt="" aria-hidden="true" />
          <h2>{t("works.schedule_regeneration.title")}</h2>
          <p>{t("works.schedule_regeneration.message")}</p>
          <div className="task-schedule-regeneration-confirmation__actions">
            <CustomButton
              color="fire"
              size="large"
              onClick={onConfirm}
              loading={loading}
            >
              {t("works.schedule_regeneration.confirm")}
            </CustomButton>
            <CustomButton
              color="fire"
              size="large"
              variant="outlined"
              onClick={onCancel}
              disabled={loading}
            >
              {t("works.schedule_regeneration.cancel")}
            </CustomButton>
          </div>
        </div>
      </GlobalModal.Body>
    </GlobalModal>
  );
}
