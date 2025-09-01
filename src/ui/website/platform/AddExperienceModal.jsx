import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import SelectField from "../../forms/SelectField";
import InputField from "../../forms/InputField";
import CustomButton from "../../CustomButton";

export default function AddExperienceModal({
  showExperienceModal,
  setShowExperienceModal,
}) {
  const { t } = useTranslation();

  return (
    <Modal
      show={showExperienceModal}
      onHide={() => setShowExperienceModal(false)}
      centered
      size="lg"
      aria-labelledby="add-experience-title"
    >
      <Modal.Header closeButton>
        <Modal.Title id="add-experience-title">
          {t("website.platform.cv.addExperience")}
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

            {/* Description */}
            <div className="col-12 col-md-6 p-2">
              <InputField
                label={t("website.platform.cv.description")}
                type="text"
              />
            </div>

            {/* Years of Experience */}
            <div className="col-12 col-md-6 p-2">
              <InputField
                label={t("website.platform.cv.yearsOfExperience")}
                type="number"
                min={0}
              />
            </div>

            {/* Qualification */}
            <div className="col-12 col-md-6 p-2">
              <SelectField
                label={t("website.platform.cv.qualification")}
                options={[
                  { value: "bachelor", label: t("bachelor") },
                  { value: "master", label: t("master") },
                  { value: "phd", label: t("phd") },
                ]}
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
