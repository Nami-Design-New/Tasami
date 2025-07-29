import { Modal } from "react-bootstrap";
import { useState } from "react";
import TextField from "../forms/TextField";
import SubmitButton from "../forms/SubmitButton";
import InputField from "../forms/InputField";
import CheckField from "../forms/CheckField";

const ConsultationModal = ({ showModal, setShowModal }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ageGroup, setAgeGroup] = useState("unselected");

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { title, description, ageGroup };
    setShowModal(false);
  };

  return (
    <Modal show={showModal} size="lg" onHide={() => setShowModal(false)} centered>
      <Modal.Header closeButton className="m-2">
        <h5 className="fw-bold">طلب استشارة</h5>
      </Modal.Header>

      <Modal.Body>
        <form className="form_ui" onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-12 p-1">
              <InputField
                label="عنوان الاستشارة"
                placeholder="عنوان الاستشارة"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="col-12 p-1">
              <TextField
                label="الوصف"
                placeholder="رأيك أو استفسارك هنا"
                id="description"
                as="textarea"
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="col-12 p-1">
              <CheckField
                label="نوع الاستشارة"
                id="ageGroup"
                value={ageGroup}
                activeValue="selected"
                inactiveValue="unselected"
                activeLabel="خاصة"
                inactiveLabel="عامة"
                onChange={(e) => setAgeGroup(e.target.value)}
              />
            </div>
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

export default ConsultationModal;
