import { Modal } from "react-bootstrap";
import CustomButton from "../../../ui/CustomButton";
import SelectField from "../../../ui/forms/SelectField";
import { useTranslation } from "react-i18next";

export default function ReassignTaskModal({ showModal, setShowModal }) {
  const { t } = useTranslation();

  return (
    <Modal
      centered
      size="md"
      show={showModal}
      onHide={() => setShowModal(false)}
    >
      <Modal.Header closeButton>
        <h6>{t("dashboard.tasks.reassignModal.title")}</h6>
      </Modal.Header>
      <Modal.Body>
        <form className="form_ui">
          <div className="row">
            <div className="col-12 p-2">
              <SelectField
                label={t("dashboard.tasks.reassignModal.employeeLabel")}
                options={[
                  { value: "1", name: "E-020324-000001" },
                  { value: "2", name: "E-020324-000002" },
                  { value: "3", name: "E-020324-000003" },
                ]}
              />
            </div>
            <div className="col-12 p-2">
              <CustomButton fullWidth size="large">
                {t("dashboard.tasks.reassignModal.reassignButton")}
              </CustomButton>
            </div>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}
