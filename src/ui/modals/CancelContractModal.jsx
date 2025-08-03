import { Modal } from "react-bootstrap";
import { useState } from "react";
import RadioInput from "../forms/RadioInput";
import TextField from "../forms/TextField";
import SubmitButton from "../forms/SubmitButton";

const CancelContractModal = ({ showModal, setShowModal, onSubmit }) => {
  const [selectedReason, setSelectedReason] = useState("");
  const [extraNotes, setExtraNotes] = useState("");

  const handleReasonChange = (e) => setSelectedReason(e.target.value);

  const cancelReasons = [
    "عدم التوافق في الأهداف",
    "تأخير أو عدم التزام من الطرف الآخر",
    "مشاكل في التواصل أو الفهم",
    "رغبة شخصية في إنهاء التعاقد",
    "أسباب أخرى",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      reason: selectedReason,
      notes: extraNotes,
    };
    onSubmit?.(data);
    setShowModal(false);
  };

  return (
    <Modal show={showModal} size="lg" onHide={() => setShowModal(false)} centered>
      <Modal.Header closeButton className="m-2">
        <h5 className="fw-bold">إلغاء التعاقد</h5>
      </Modal.Header>

      <Modal.Body>
        <form className="form_ui" onSubmit={handleSubmit}>
          {cancelReasons.map((reason, index) => (
            <div className="col-12 my-2" key={index}>
              <RadioInput
                label={reason}
                name="cancelReason"
                value={reason}
                active={selectedReason}
                onChange={handleReasonChange}
              />
            </div>
          ))}

          <div className="col-12 my-3">
            <TextField
              placeholder="هل لديك توضيح إضافي؟"
              value={extraNotes}
              onChange={(e) => setExtraNotes(e.target.value)}
            />
          </div>

          <div className="col-12 my-3 d-flex gap-1">
            <div className="col-6">
              <SubmitButton text="إرسال" />
            </div>
            <div className="col-6">
              <button
                type="button"
                className="cancle"
                onClick={() => setShowModal(false)}
              >
                إلغاء
              </button>
            </div>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default CancelContractModal;
