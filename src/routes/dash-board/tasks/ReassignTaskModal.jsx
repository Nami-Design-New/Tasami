import { Modal } from "react-bootstrap";
import CustomButton from "../../../ui/CustomButton";
import SelectField from "../../../ui/forms/SelectField";

export default function ReassignTaskModal({ showModal, setShowModal }) {
  return (
    <Modal
      centered
      size="md"
      show={showModal}
      onHide={() => setShowModal(false)}
    >
      <Modal.Header closeButton>
        <h6>اعادة تعيين مهمة</h6>
      </Modal.Header>
      <Modal.Body>
        <form className="form_ui">
          <div className="row">
            <div className="col-12 p-2">
              <SelectField
                label="اسم الموظف"
                options={[
                  { value: "1", name: "E-020324-000001" },
                  { value: "2", name: "E-020324-000002" },
                  { value: "3", name: "E-020324-000003" },
                ]}
              />
            </div>
            <div className="col-12 p-2">
              <CustomButton fullWidth size="large">
                اعادة تعيين
              </CustomButton>
            </div>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}
