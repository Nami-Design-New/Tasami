import { useTranslation } from "react-i18next";

import CustomButton from "../../CustomButton";
import GlobalModal from "../../GlobalModal";

export default function FirstGroupRequiredModal({
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
      className="first-group-required-modal"
    >
      <GlobalModal.Body>
        <div className="first-group-required">
          <div className="first-group-required__icon" aria-hidden="true">
            !
          </div>

          <h2>{t("website.platform.groups.firstGroupWarning.title")}</h2>

          <div className="first-group-required__guide">
            <p>{t("website.platform.groups.firstGroupWarning.guide")}</p>
            <div
              className="first-group-required__steps"
              aria-label={t("website.platform.groups.firstGroupWarning.guide")}
            >
              <span>{t("website.platform.platform")}</span>
              <i className="fa-solid fa-chevron-left" aria-hidden="true" />
              <span>{t("website.platform.menu.myGroups")}</span>
              <i className="fa-solid fa-chevron-left" aria-hidden="true" />
              <strong>{t("website.platform.groups.addNew")}</strong>
            </div>
          </div>

          <p className="first-group-required__description">
            {t("website.platform.groups.firstGroupWarning.description")}
          </p>

          <div className="first-group-required__actions">
            <CustomButton color="fire" size="large" onClick={onCreateGroup}>
              {t("website.platform.groups.firstGroupWarning.createGroup")}
            </CustomButton>
            <CustomButton
              color="fire"
              size="large"
              variant="outlined"
              onClick={onClose}
            >
              {t("website.platform.groups.firstGroupWarning.close")}
            </CustomButton>
          </div>
        </div>
      </GlobalModal.Body>
    </GlobalModal>
  );
}
