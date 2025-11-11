import { useState } from "react";
import { Modal } from "react-bootstrap";
import CustomButton from "../../../ui/CustomButton";
import FileUploader from "../../../ui/forms/FileUPloader";
import InputField from "../../../ui/forms/InputField";
import SelectField from "../../../ui/forms/SelectField";
import TextField from "../../../ui/forms/TextField";
import { useTranslation } from "react-i18next";

const AddNewTask = ({ showModal, setShowModal, title }) => {
  const [files, setFiles] = useState([]);
  const { t } = useTranslation();
  const handleFilesChange = (updatedFiles) => {
    setFiles(updatedFiles);
  };
  const handleClose = () => {
    setShowModal(false);
  };
  return (
    <Modal size="lg" centered show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <h6>{title}</h6>
      </Modal.Header>
      <Modal.Body>
        <form className="form_ui">
          <div className="row">
            <div className="col-12 col-md-6 py-2">
              <SelectField
                label={t("dashboard.workModel.employee")}
                options={[
                  { value: "1", name: "S-111111-0111111" },
                  { value: "2", name: "S-111111-0111111" },
                ]}
              />
            </div>

            <div className="col-12 col-md-6 py-2">
              <InputField
                label={t("dashboard.workModel.subjectTitle")}
                placeholder={t("dashboard.workModel.addSubjectPlaceholder")}
              />
            </div>

            <div className="col-12 col-md-6 py-2">
              <SelectField
                label={t("dashboard.workModel.formType")}
                options={[
                  { value: "1", name: "استفسار" },
                  { value: "2", name: "اقتراح" },
                ]}
              />
            </div>

            <div className="col-12 py-2">
              <TextField
                label={t("dashboard.workModel.description")}
                placeholder={t("dashboard.workModel.addDescriptionPlaceholder")}
              />
            </div>

            <div>
              <FileUploader
                files={files}
                onFilesChange={handleFilesChange}
                label={t("dashboard.workModel.addAttachments")}
              />
            </div>
          </div>

          <div className="col-12 py-2">
            <div className="col-12 mt-3 d-flex align-items-center justify-content-end gap-2">
              <CustomButton
                size="meduim"
                type="button"
                color="secondary"
                onClick={() => setShowModal(false)}
              >
                {t("dashboard.workModel.cancel")}
              </CustomButton>
              <CustomButton size="meduim" color="primary">
                {t("dashboard.workModel.send")}
              </CustomButton>
            </div>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default AddNewTask;
