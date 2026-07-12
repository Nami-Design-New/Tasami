import { useTranslation } from "react-i18next";

import CustomButton from "../../../CustomButton";
import GlobalModal from "../../../GlobalModal";

export default function GroupLimitReachedModal({ showModal, onClose }) {
  const { t } = useTranslation();

  return (
    <GlobalModal
      show={showModal}
      centered
      onHide={onClose}
      className="first-group-required-modal"
    >
      <GlobalModal.Body>
        <div className="first-group-required group-limit-reached">
          <div className="first-group-required__icon" aria-hidden="true">
            !
          </div>

          <h2>{t("website.platform.groups.limitReached.title")}</h2>

          <p className="first-group-required__description">
            {t("website.platform.groups.limitReached.description")}
          </p>

          <div className="first-group-required__actions">
            <CustomButton color="fire" size="large" onClick={onClose}>
              {t("website.platform.groups.limitReached.confirm")}
            </CustomButton>
          </div>
        </div>
      </GlobalModal.Body>
    </GlobalModal>
  );
}
