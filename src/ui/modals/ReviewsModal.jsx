import { Modal } from "react-bootstrap";

const ReviewsModal = ({ showModal, setShowModal, reviews = [] }) => {
  return (
    <Modal
      show={showModal}
      size="lg"
      onHide={() => setShowModal(false)}
      centered
    >
      <Modal.Header closeButton className="reviews-modal__header">
        <h5 className="reviews-modal__title">عرض التقييمات</h5>
      </Modal.Header>

      <Modal.Body>
        <div className="reviews-modal__body">
          <div className="reviews-modal__average">
            <span className="reviews-modal__score">4.4</span>
            <span className="reviews-modal__count">(453 تقييم)</span>
            <div className="reviews-modal__stars">
              {[1, 2, 3, 4, 5].map((i) => (
                <i
                  key={i}
                  className={`fa-star fa ${
                    i <= 4 ? "fa-solid" : "fa-regular"
                  }`}
                ></i>
              ))}
            </div>
          </div>

          <div className="reviews-modal__list row">
            {reviews.map((review, index) => (
              <div
                key={index}
                className="reviews-modal__card col-12 col-lg-6"
              >
                <div className="reviews-modal__info">
                  <div className="reviews-modal__name">{review.name}</div>
                  <div className="reviews-modal__stars">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <i
                        key={i}
                        className={`fa-star fa ${
                          i <= review.stars ? "fa-solid" : "fa-regular"
                        }`}
                      ></i>
                    ))}
                  </div>
                </div>

                <div className="reviews-modal__time">{review.time}</div>
                <div className="reviews-modal__comment">{review.comment}</div>
              </div>
            ))}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ReviewsModal;
