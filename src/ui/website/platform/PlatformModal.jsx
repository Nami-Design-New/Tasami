import { useTranslation } from "react-i18next";
import CustomButton from "../../CustomButton";
import { useNavigate } from "react-router";
import GlobalModal from "../../GlobalModal";

export default function PlatformModal({ showModal, setShowModal }) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <GlobalModal
      centered
      size="md"
      show={showModal}
      onHide={() => setShowModal(false)}
    >
      <GlobalModal.Header closeButton className="platform-modal-header">
        <h6> {t("website.platform.header")}</h6>
      </GlobalModal.Header>

      <GlobalModal.Body className="platform-modal-body">
        <h1 className="platform-modal-heading">
          {t("website.platform.title")}
        </h1>

        <div className="platform-modal-content">
          <p className="platform-modal-paragraph">
            {t("website.platform.description1")}
          </p>

          <p className="platform-modal-paragraph">
            {t("website.platform.description2")}
          </p>
        </div>
        <CustomButton
          onClick={() => {
            navigate("/my-platform/my-cv");
            setShowModal(false);
          }}
          fullWidth
          size="large"
        >
          {t("website.platform.button")}
        </CustomButton>
      </GlobalModal.Body>
    </GlobalModal>
  );
}
