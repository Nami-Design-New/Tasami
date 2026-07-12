import { useTranslation } from "react-i18next";

import alertIcon from "../../../assets/icons/alert.svg";
import CustomButton from "../../CustomButton";
import GlobalModal from "../../GlobalModal";

export default function ContractEndedGoalActiveModal({ showModal, onClose }) {
  const { t } = useTranslation();

  return (
    <GlobalModal
      show={showModal}
      centered
      onHide={onClose}
      className="contract-ended-goal-active-modal"
    >
      <GlobalModal.Body>
        <div className="contract-ended-goal-active">
          <img src={alertIcon} alt="" aria-hidden="true" />

          <h2>{t("works.contractDetails.goalStillActive.title")}</h2>

          <p>{t("works.contractDetails.goalStillActive.description")}</p>

          <CustomButton color="fire" size="large" onClick={onClose}>
            {t("works.contractDetails.goalStillActive.confirm")}
          </CustomButton>
        </div>
      </GlobalModal.Body>
    </GlobalModal>
  );
}
