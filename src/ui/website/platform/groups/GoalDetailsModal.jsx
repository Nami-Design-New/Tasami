import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";

export default function GoalDetailsModal({
  showModal,
  setShowModal,
  name,
  category,
  subCategory,
  title,
}) {
  const { t } = useTranslation();
  return (
    <Modal show={showModal} onHide={() => setShowModal(false)} centered>
      <Modal.Header closeButton>
        <h6>{name}</h6>
      </Modal.Header>
      <Modal.Body>
        <div className="info-grid w-100">
          <div className="row w-100">
            <div className="col-6 p-2">
              <div className="info-box flex-grow-1  w-100">
                <div className="label">{t("website.offerDetails.field")}</div>
                <div className="value">{category}</div>
              </div>
            </div>
            <div className="col-6 p-2">
              {" "}
              <div className="info-box w-100 flex-grow-1">
                <div className="label">
                  {t("website.offerDetails.specialty")}
                </div>{" "}
                <div className="value">{subCategory}</div>
              </div>
            </div>
            <div className="col-12 p-2">
              {" "}
              <div className="info-box flex-grow-1 w-100 white-space-nowrap ">
                <div className="label">{t("الهدف")}</div>{" "}
                <div className="value">{title}</div>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
