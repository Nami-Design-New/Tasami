import { Modal } from "react-bootstrap";
import InputField from "../../../ui/forms/InputField";
import CustomButton from "../../../ui/CustomButton";
import SelectField from "../../../ui/forms/SelectField";
import { useTranslation } from "react-i18next";

export default function AddDocumentModal({
  showDocumentModal,
  setShowDocumentModal,
}) {
  const { t } = useTranslation();

  return (
    <Modal
      show={showDocumentModal}
      onHide={() => setShowDocumentModal(false)}
      centered
      size="lg"
      aria-labelledby="add-document-title"
    >
      <Modal.Header closeButton>
        <Modal.Title id="add-document-title">
          <h6>{t("website.platform.cv.addDocument")}</h6>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form className="form_ui">
          <div className="row">
            {/* Field */}
            <div className="col-12 col-md-6 p-2">
              <SelectField
                label={t("website.platform.cv.field")}
                options={[
                  { value: "junior", label: t("junior") },
                  { value: "mid", label: t("mid") },
                  { value: "senior", label: t("senior") },
                ]}
              />
            </div>

            {/* Specialization */}
            <div className="col-12 col-md-6 p-2">
              <SelectField
                label={t("website.platform.cv.specialization")}
                options={[
                  { value: "junior", label: t("junior") },
                  { value: "mid", label: t("mid") },
                  { value: "senior", label: t("senior") },
                ]}
                hint={t("website.platform.cv.specializationHint")}
              />
            </div>

            {/* Document Type */}
            <div className="col-12 col-md-6 p-2">
              <InputField
                label={t("website.platform.cv.documentType")}
                type="text"
              />
            </div>

            {/* Issuing Authority */}
            <div className="col-12 col-md-6 p-2">
              <InputField
                label={t("website.platform.cv.issuingAuthority")}
                type="text"
              />
            </div>

            {/* Document Number */}
            <div className="col-12 col-md-6 p-2">
              <InputField
                label={t("website.platform.cv.documentNumber")}
                type="text"
              />
            </div>

            {/* Expiry Date */}
            <div className="col-12 col-md-6 p-2">
              <InputField
                label={t("website.platform.cv.expiryDate")}
                type="date"
              />
            </div>

            {/* Save Button */}
            <div className="col-12 d-flex justify-content-end p-2">
              <CustomButton type="submit" size="large">
                {t("website.platform.cv.save")}
              </CustomButton>
            </div>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}
