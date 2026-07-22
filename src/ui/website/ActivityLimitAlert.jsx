import { useTranslation } from "react-i18next";

import AlertModal from "./platform/my-community/AlertModal";

export default function ActivityLimitAlert({ showModal, setShowModal, type, limit }) {
  const { t } = useTranslation();

  return (
    <AlertModal
      showModal={showModal}
      setShowModal={setShowModal}
      confirmButtonText={t("ok")}
      showCancel={false}
      withoutMessage={false}
      animation={false}
      onConfirm={() => setShowModal(false)}
    >
      <div className="activity-limit-alert text-center">
        <h4>{t(`activityLimits.${type}.title`, { limit })}</h4>
        <p>{t(`activityLimits.${type}.description`)}</p>
      </div>
    </AlertModal>
  );
}
