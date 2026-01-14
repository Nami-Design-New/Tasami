import GlobalModal from "../../../GlobalModal";
import StarRate from "../../../ModelComponent/common/StarRate";
import { useTranslation } from "react-i18next";

export default function RateShowModal({ showModal, setShowModal, contract }) {
  const { t } = useTranslation();
  return (
    <GlobalModal
      className="show-rate-modal"
      show={showModal}
      onHide={() => setShowModal(false)}
      centered
      size="md"
    >
      <GlobalModal.Header closeButton>
        <h6>{t("rate_view_title")}</h6>
      </GlobalModal.Header>
      <GlobalModal.Body>
        <div className="row">
          <div className="col-12 p-2">
            <div className="rate-summary">
              <p>{contract?.rate?.total_average} </p>
              <StarRate
                rating={contract?.rate?.total_average}
                isRating={false}
              />
              <span className="rate-count">({contract.rate.rates_count})</span>
            </div>
          </div>
          <div className="col-12 p-2">
            <div className="d-flex align-items-center justify-content-between">
              <span>{t("rate_experience")}</span>
              <StarRate rating={contract?.rate?.experience_and_knowledge} />
            </div>
          </div>
          <div className="col-12 p-2">
            <div className="d-flex align-items-center justify-content-between">
              <span>{t("rate_commitment")}</span>
              <StarRate rating={contract?.rate?.commitment_to_time} />
            </div>
          </div>
          <div className="col-12 p-2">
            <div className="d-flex align-items-center justify-content-between">
              <span>{t("rate_quality")}</span>
              <StarRate rating={contract?.rate?.quality_of_performance} />
            </div>
          </div>
          <div className="col-12 p-2">
            <div className="d-flex align-items-center justify-content-between">
              <span>{t("rate_respect")}</span>
              <StarRate rating={contract?.rate?.respect_and_treatment} />
            </div>
          </div>
          <div className="col-12 p-2">
            <p className="notes">{contract?.rate?.notes}</p>
          </div>
        </div>
      </GlobalModal.Body>
    </GlobalModal>
  );
}
