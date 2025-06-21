import { Modal } from "react-bootstrap";
import CustomButton from "../CustomButton";
import InputField from "../forms/InputField";

const OperatingSectorsModal = ({ showModal, setShowModal }) => {
  return (
    <Modal
      show={showModal}
      size="lg"
      onHide={() => setShowModal(false)}
      aria-labelledby="working group add / edit Modal"
      centered
    >
      <Modal.Header closeButton>
        <h6> قطاع جديد </h6>
      </Modal.Header>
      <Modal.Body>
        <form className="form_ui ">
          <div className="row g-3">
            <div className="col-12 col-md-6">
              <InputField label="الاقليم" placeholder="ادخل اسم الاقليم" />
            </div>
            <div className="col-12 col-md-6">
              <InputField label="رقم الاقليم" placeholder="ادخل رقم الاقليم" />
            </div>
            <div className="col-12 col-md-6">
              <InputField label="القطاع" placeholder="ادخل اسم القطاع" />
            </div>
            <div className="col-12 col-md-6">
              <InputField label="رقم القطاع " placeholder="ادخل رقم القطاع" />
            </div>
            <div className="col-12 col-md-6">
              <InputField label="اسم المدينة" placeholder="ادخل رقم المدينة" />
            </div>
            <div className="col-12 col-md-6">
              <InputField label="رقم المدينة" placeholder="ادخل رقم المدينة" />
            </div>

            <div className="d-flex justify-content-end ">
              <CustomButton>إضافة</CustomButton>
            </div>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default OperatingSectorsModal;
