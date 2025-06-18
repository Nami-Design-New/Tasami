import { Modal } from "react-bootstrap";
import InputField from "../forms/InputField";
import SubmitButton from "../forms/SubmitButton";
import SelectField from "../forms/SelectField";

const SubjectModal = ({ showModal, setShowModal, isEdit = false }) => {
  return (
    <Modal
      show={showModal}
      size="lg"
      onHide={() => setShowModal(false)}
      aria-labelledby="working group add / edit Modal"
      centered
    >
      <Modal.Header closeButton>
        {isEdit ? <h6> تعديل الموضوع </h6> : <h6> موضوع جديد </h6>}
      </Modal.Header>
      <Modal.Body>
        <form className="form_ui ">
          <div className="row g-3">
            <div className="col-12 col-md-6">
              <SelectField
                label="النظام الاداري"
                options={[
                  { value: 1, name: "داخلي" },
                  { value: 2, name: "خارجي" },
                ]}
              />
            </div>
            <div className="col-12 col-md-6">
              <InputField label=" الموضوع " />
            </div>
            <div className="col-12 ">
              <SubmitButton text=" تاكيد و اضافه " />
            </div>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default SubjectModal;
