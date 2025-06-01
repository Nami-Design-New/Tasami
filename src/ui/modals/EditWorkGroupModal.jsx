import { Modal } from "react-bootstrap";
import InputField from "../forms/InputField";
import SubmitButton from "../forms/SubmitButton";
import SelectField from "../forms/SelectField";

const EditWorkGroupModal = ({ showModal, setShowModal }) => {
  return (
    <Modal
      show={showModal}
      size="lg"
      onHide={() => setShowModal(false)}
      aria-labelledby="working group add / edit Modal"
      centered
    >
      <Modal.Header closeButton>
        <h6>تعديل المجموعه</h6>
      </Modal.Header>
      <Modal.Body>
        <form className="form_ui ">
          <div className="row g-3">
            <div className="col-12 col-md-6">
              <InputField label="رقم المجموعه" value="GIN-0000001" />
            </div>
            <div className="col-12 col-md-6 ">
              <SelectField
                label="الاقليم"
                options={[
                  { value: 1, name: "الشرق الاوسط" },
                  { value: 2, name: "اوروبا" },
                  { value: 3, name: "امريكا الشماليه" },
                ]}
              />
            </div>
            <div className="col-12 col-md-6 ">
              <SelectField
                label="القطاع"
                options={[
                  { value: 1, name: "السعوديه" },
                  { value: 2, name: "مصر" },
                  { value: 3, name: "المغرب" },
                ]}
              />
            </div>
            <div className="col-12 col-md-6 ">
              <SelectField
                label="المدينة"
                options={[
                  { value: 1, name: "جده" },
                  { value: 2, name: "الرياض" },
                  { value: 3, name: "المدينه" },
                ]}
              />
            </div>
            <div className="col-12 ">
              <SubmitButton text="تاكيد و حفظ" />
            </div>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default EditWorkGroupModal;
