import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import InputField from "../forms/InputField";
import CustomButton from "../CustomButton";

const PasswordChangeModal = ({ showModal, setShowModal }) => {
  const { t } = useTranslation();

  return (
    <Modal
      show={showModal}
      onHide={() => setShowModal(false)}
      size="md"
      centered
    >
      <Modal.Header closeButton>
        <h6>{t("dashboard.employeeProfile.passwordChange.title")}</h6>
      </Modal.Header>

      <Modal.Body>
        <form className="form_ui">
          <div className="row">
            <div className="col-12 p-2">
              <InputField
                label={t(
                  "dashboard.employeeProfile.passwordChange.oldPassword"
                )}
                type="password"
              />
            </div>
            <div className="col-12 p-2">
              <InputField
                label={t(
                  "dashboard.employeeProfile.passwordChange.newPassword"
                )}
                type="password"
              />
            </div>
            <div className="col-12 p-2">
              <InputField
                label={t(
                  "dashboard.employeeProfile.passwordChange.confirmPassword"
                )}
                type="password"
              />
            </div>{" "}
            <div className="col-12 p-2">
              <CustomButton size="large" fullWidth>
                {t("dashboard.employeeProfile.passwordChange.confirm")}
              </CustomButton>
            </div>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default PasswordChangeModal;
