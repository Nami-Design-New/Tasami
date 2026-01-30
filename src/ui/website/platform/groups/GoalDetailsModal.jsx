import { useTranslation } from "react-i18next";
import GlobalModal from "../../../GlobalModal";

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
    <GlobalModal show={showModal} onHide={() => setShowModal(false)} centered>
      <GlobalModal.Header closeButton>
        <h6>{name}</h6>
      </GlobalModal.Header>
      <GlobalModal.Body>
        <div className="info-grid w-100">
          <div className="row w-100">
            <div className="col-6 p-2">
              <div className="info-box flex-grow-1  w-100">
                <h4 className="label">{t("website.offerDetails.field")}</h4>
                <p className="value">{category}</p>
              </div>
            </div>
            <div className="col-6 p-2">
              {" "}
              <div className="info-box w-100 flex-grow-1">
                <h4 className="label">{t("website.offerDetails.specialty")}</h4>{" "}
                <p className="value">{subCategory}</p>
              </div>
            </div>
            <div className="col-12 p-2">
              {" "}
              <div className="info-box flex-grow-1 w-100  ">
                <h4 className="label">{t("goal")}</h4>{" "}
                <p className="value">{title}</p>
              </div>
            </div>
          </div>
        </div>
      </GlobalModal.Body>
    </GlobalModal>
  );
}
