import { Modal } from "react-bootstrap";

const ViewRateModal = ({ showModal, setShowModal, ratingData }) => {
  const criteria = [
    { key: "knowledge", label: "الخبرة والمعرفة" },
    { key: "punctuality", label: "الالتزام بالوقت" },
    { key: "quality", label: "جودة الأداء" },
    { key: "respect", label: "الاحترام والتعامل" },
  ];

  return (
    <Modal
      show={showModal}
      onHide={() => setShowModal(false)}
      centered
      size="md"
      className="rate-modal"
    >
      <Modal.Header closeButton>
        <h5 className="modal-title">عرض التقييم</h5>
      </Modal.Header>
      <Modal.Body>
        <div className="rating-sections">
          {criteria.map(({ key, label }) => (
            <div className="rating-row" key={key}>
              <div className="label">{label}</div>
              <div className="stars">
                {[1, 2, 3, 4, 5].map((i) => (
                  <i
                    key={i}
                    className={`fa-star fa ${
                      i <= (ratingData?.[key] || 0)
                        ? "fa-solid text-warning"
                        : "fa-regular text-muted"
                    }`}
                  ></i>
                ))}
              </div>
            </div>
          ))}
        </div>

        {ratingData?.comment && (
          <div className="col-12 p-1 mt-3">
            <div className="comment-box">
              <div className="text-muted small">{ratingData.comment}</div>
            </div>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default ViewRateModal;
