import { useTranslation } from "react-i18next";

import successMark from "../../../assets/icons/toasts/success-mark.svg";
import CustomButton from "../../CustomButton";
import GlobalModal from "../../GlobalModal";

export default function FollowSuccessModal({
  showModal,
  onClose,
  onDismissPermanently,
  isSavingPreference,
}) {
  const { t } = useTranslation();

  return (
    <GlobalModal
      show={showModal}
      centered
      onHide={onClose}
      className="follow-success-modal"
    >
      <GlobalModal.Body>
        <div className="follow-success">
          <img
            className="follow-success__icon"
            src={successMark}
            alt=""
            aria-hidden="true"
          />

          <h2>{t("website.assistants.followSuccess.title")}</h2>

          <p className="follow-success__description">
            {t("website.assistants.followSuccess.description")}
          </p>

          <CustomButton
            color="success"
            size="large"
            onClick={onClose}
            disabled={isSavingPreference}
          >
            {t("website.assistants.followSuccess.confirm")}
          </CustomButton>

          <button
            type="button"
            className="follow-success__dismiss"
            onClick={onDismissPermanently}
            disabled={isSavingPreference}
          >
            {t("website.assistants.followSuccess.dismissPermanently")}
          </button>
        </div>
      </GlobalModal.Body>
    </GlobalModal>
  );
}
