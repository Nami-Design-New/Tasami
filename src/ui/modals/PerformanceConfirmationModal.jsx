import { Modal } from "react-bootstrap";
import { useState } from "react";
import SubmitButton from "../forms/SubmitButton";
import SelectField from "../forms/SelectField";

const PerformanceConfirmationModal = ({ showModal, setShowModal, onConfirm }) => {
  const [guidanceType, setGuidanceType] = useState("");
  const [investigationType, setInvestigationType] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm({ guidanceType, investigationType });
    setShowModal(false);
  };

  const guidanceOptions = [
    { value: "training", name: "تدريب" },
    { value: "counseling", name: "إرشاد مهني" },
    { value: "monitoring", name: "متابعة" },
  ];

  const investigationOptions = [
    { value: "violation", name: "مخالفة" },
    { value: "absence", name: "غياب" },
    { value: "performance", name: "ضعف الأداء" },
  ];

  return (
    <Modal show={showModal} size="md" onHide={() => setShowModal(false)} centered>
      <Modal.Header closeButton className="m-2">
        <h5 className="fw-bold">تأكيد الأداء</h5>
      </Modal.Header>

      <Modal.Body>
        <form className="form_ui" onSubmit={handleSubmit}>
          <div className="col-12 p-1">
            <SelectField
              label=" الإرشاد"
              options={guidanceOptions}
              value={guidanceType}
              onChange={(e) => setGuidanceType(e.target.value)}
              disableFiledValue=" الإرشاد"
              required
            />
          </div>

          <div className="col-12 p-1">
            <SelectField
              label=" التحقيق"
              options={investigationOptions}
              value={investigationType}
              onChange={(e) => setInvestigationType(e.target.value)}
              disableFiledValue="  التحقيق"
              required
            />
          </div>

          <div className="col-12 my-3 d-flex gap-1">
            <div className="col-6">
              <SubmitButton text="تأكيد" />
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

export default PerformanceConfirmationModal;
