import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import CustomButton from "../../CustomButton";
import { useNavigate } from "react-router";

export default function PlatformModal({ showModal, setShowModal }) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Modal
      centered
      size="md"
      show={showModal}
      onHide={() => setShowModal(false)}
    >
      <Modal.Header closeButton className="platform-modal-header">
        {t("website.platform.header")}
      </Modal.Header>

      <Modal.Body className="platform-modal-body">
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
            navigate("/my-platform");
            setShowModal(false);
          }}
          fullWidth
          size="large"
        >
          {t("website.platform.button")}
        </CustomButton>
      </Modal.Body>
    </Modal>
  );
}
