import { useTranslation } from "react-i18next";
import AlertModal from "../platform/my-community/AlertModal";

export default function InquiryUnavailableAlert({ showModal, setShowModal }) {
  const { t } = useTranslation();

  return (
    <AlertModal
      showModal={showModal}
      setShowModal={setShowModal}
      confirmButtonText={t("ok")}
      showCancel={false}
      withoutMessage={false}
      onConfirm={() => setShowModal(false)}
    >
      <div className="inquiry-alert-message">
        <h4>{t("sendInquiryAlertTitle")}</h4>
        <p>{t("sendInquiryAlertDescription")}</p>
      </div>
    </AlertModal>
  );
}
