import { useTranslation } from "react-i18next";

import successMark from "../../../assets/icons/toasts/success-mark.svg";
import CustomButton from "../../CustomButton";
import GlobalModal from "../../GlobalModal";

export default function CvActivationSuccessModal({
  showModal,
  onClose,
  onCreateGroup,
}) {
  const { t } = useTranslation();

  return (
    <GlobalModal
      show={showModal}
      centered
      onHide={onClose}
      className="cv-activation-success-modal"
    >
      <GlobalModal.Body>
        <div className="cv-activation-success">
          <img
            className="cv-activation-success__icon"
            src={successMark}
            alt=""
            aria-hidden="true"
          />

          <h2>{t("website.platform.cv.activationSuccess.title")}</h2>

          <div className="cv-activation-success__guide">
            <p>{t("website.platform.cv.activationSuccess.guide")}</p>
            <div
              className="cv-activation-success__steps"
              aria-label={t("website.platform.cv.activationSuccess.guide")}
            >
              <span>{t("website.platform.platform")}</span>
              <i className="fa-solid fa-chevron-left" aria-hidden="true" />
              <span>{t("website.platform.menu.myGroups")}</span>
              <i className="fa-solid fa-chevron-left" aria-hidden="true" />
              <strong>{t("website.platform.groups.addNew")}</strong>
            </div>
          </div>

          <p className="cv-activation-success__description">
            {t("website.platform.cv.activationSuccess.description")}
          </p>

          <div className="cv-activation-success__actions">
            <CustomButton color="success" size="large" onClick={onCreateGroup}>
              {t("website.platform.cv.activationSuccess.createGroup")}
            </CustomButton>
            <CustomButton
              color="success"
              size="large"
              variant="outlined"
              onClick={onClose}
            >
              {t("website.platform.cv.activationSuccess.close")}
            </CustomButton>
          </div>
        </div>
      </GlobalModal.Body>
    </GlobalModal>
  );
}
