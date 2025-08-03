import { Modal } from "react-bootstrap";
import { useState } from "react";
import DatePicker from "../forms/DatePicker";
import InputField from "../forms/InputField";
import CheckField from "../forms/CheckField";
import SubmitButton from "../forms/SubmitButton";

const ExtendContractModal = ({ showModal, setShowModal, onSubmit }) => {
  const [startDate, setStartDate] = useState("");
  const [duration, setDuration] = useState("");
  const [durationUnit, setDurationUnit] = useState("يوم");

  const handleSave = (e) => {
    e.preventDefault();
    const data = {
      startDate,
      duration,
      durationUnit,
    };
    onSubmit?.(data);
    setShowModal(false);
  };

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)} centered size="md">
      <Modal.Header closeButton className="m-2">
        <h5 className="fw-bold">تمديد التعاقد</h5>
      </Modal.Header>

      <Modal.Body>
        <form className="form_ui" onSubmit={handleSave}>
          <div className="row">
            <div className="col-12 p-1">
              <DatePicker
                label="تاريخ البدء"
                id="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            <div className="col-12 p-1">
              <label className="field-label fw-bold">مدة التمديد</label>
              <div className="d-flex align-items-center gap-2">
                <div className="flex-grow-1">
                  <InputField
                    id="duration"
                    type="number"
                    placeholder={`بالـ ${durationUnit}`}
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                  />
                </div>
                <div style={{ width: "130px" }}>
                  <CheckField
                    id="duration_unit"
                    value={durationUnit}
                    onChange={(e) => setDurationUnit(e.target.value)}
                    activeValue="شهر"
                    inactiveValue="يوم"
                    activeLabel="شهر"
                    inactiveLabel="يوم"
                  />
                </div>
              </div>
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

export default ExtendContractModal;
