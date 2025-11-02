import { Modal } from "react-bootstrap";
import StarRate from "../../../ModelComponent/common/StarRate";

export default function RateShowModal({ showModal, setShowModal, contract }) {
  return (
    <Modal
      className="show-rate-modal"
      show={showModal}
      onHide={() => setShowModal(false)}
      centered
      size="md"
    >
      <Modal.Header closeButton>
        <h5>عرض التقييم</h5>
      </Modal.Header>
      <Modal.Body>
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
              <span>الخبرة والمعرفة</span>
              <StarRate rating={contract?.rate?.experience_and_knowledge} />
            </div>
          </div>
          <div className="col-12 p-2">
            <div className="d-flex align-items-center justify-content-between">
              <span>الإلتزام بالوقت</span>
              <StarRate rating={contract?.rate?.commitment_to_time} />
            </div>
          </div>
          <div className="col-12 p-2">
            <div className="d-flex align-items-center justify-content-between">
              <span>جودة الأداء</span>
              <StarRate rating={contract?.rate?.quality_of_performance} />
            </div>
          </div>
          <div className="col-12 p-2">
            <div className="d-flex align-items-center justify-content-between">
              <span>الاحترام والتعامل</span>
              <StarRate rating={contract?.rate?.respect_and_treatment} />
            </div>
          </div>
          <div className="col-12 p-2">
            <p className="notes">{contract?.rate?.notes}</p>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
