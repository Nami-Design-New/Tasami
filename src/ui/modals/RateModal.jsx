import { Modal, Button, Form } from "react-bootstrap";
import { useState } from "react";
import SubmitButton from "../forms/SubmitButton";
import TextField from "../forms/TextField";

const RateModal = ({ showModal, setShowModal, onSubmit }) => {
  const [ratings, setRatings] = useState({
    knowledge: 0,
    punctuality: 0,
    quality: 0,
    respect: 0,
  });
  const [comment, setComment] = useState("");

  const handleStarClick = (field, value) => {
    setRatings((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onSubmit?.({ ...ratings, comment });
    setShowModal(false);
  };

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
        <h5 className="modal-title">قيّم تجربتك</h5>
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
                      i <= ratings[key]
                        ? "fa-solid text-warning"
                        : "fa-regular text-muted"
                    }`}
                    onClick={() => handleStarClick(key, i)}
                    style={{ cursor: "pointer" }}
                  ></i>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="col-12 p-1">
          <TextField placeholder="اكتب تعليقك هنا..." id="commentText" />
        </div>
        <div className="col-12 my-3">
          <SubmitButton text="حفظ" />
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RateModal;
