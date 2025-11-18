import { useState } from "react";
import { useTranslation } from "react-i18next";

import FileUploader from "../../forms/FileUPloader";
import FormWrapper from "../../forms/FormWrapper";
import InputField from "../../forms/InputField";
import SelectField from "../../forms/SelectField";
import ProfileImageUploader from "../../ProfileImageUploader";
import CustomButton from "../../CustomButton";

const EmployerDataForm = ({ isEdit }) => {
  const [files, setFiles] = useState([]);
  const [image, setImage] = useState(
    "/images/dashboard/avatar-placeholder.jpg"
  );

  const { t } = useTranslation();

  const handleFilesChange = (updatedFiles) => {
    setFiles(updatedFiles);
  };

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  return (
    <>
      <form className="form_ui">
        {/* Employment Data */}
        <FormWrapper title={t("dashboard.createEmployee.form.employmentData")}>
          <div className="row">
            {/* Job Level */}
            <div className="col-12 col-md-6 col-xxl-4 p-2">
              <SelectField
                label={t("dashboard.createEmployee.form.jobLevel")}
                disableFiledValue={t(
                  "dashboard.createEmployee.form.selectJobLevel"
                )}
                options={[
                  {
                    value: 1,
                    name: t("dashboard.createEmployee.form.jobLevel_executive"),
                  },
                  {
                    value: 2,
                    name: t("dashboard.createEmployee.form.jobLevel_leader"),
                  },
                  {
                    value: 3,
                    name: t("dashboard.createEmployee.form.jobLevel_manager"),
                  },
                  {
                    value: 4,
                    name: t(
                      "dashboard.createEmployee.form.jobLevel_supervisor"
                    ),
                  },
                  {
                    value: 5,
                    name: t(
                      "dashboard.createEmployee.form.jobLevel_customerService"
                    ),
                  },
                ]}
              />
            </div>

            {/* Job Title */}
            <div className="col-12 col-md-6 col-xxl-4 p-2">
              <InputField
                label={t("dashboard.createEmployee.form.jobTitle")}
                type="text"
                placeholder={t(
                  "dashboard.createEmployee.form.jobTitle_placeholder"
                )}
              />
            </div>

            {/* Account Number */}
            {isEdit && (
              <>
                <div className="col-12 col-md-6 col-xxl-4 p-2">
                  <InputField
                    label={t("dashboard.createEmployee.form.accountNumber")}
                    type="text"
                    placeholder="EX: D-140123-00001"
                  />
                </div>

                {/* Date */}
                <div className="col-12 col-md-6 col-xxl-4 p-2">
                  <InputField
                    label={t("dashboard.createEmployee.form.date")}
                    type="date"
                    value={new Date().toISOString().split("T")[0]}
                  />
                </div>
              </>
            )}

            {/* Group */}
            <div className="col-12 col-md-6 col-xxl-4 p-2">
              <SelectField
                label={t("dashboard.createEmployee.form.group")}
                disableFiledValue={t(
                  "dashboard.createEmployee.form.selectGroup"
                )}
                options={[
                  { value: 1, name: "AG-000001" },
                  { value: 2, name: "OG-000002" },
                  { value: 3, name: "AG-000003" },
                  { value: 4, name: "OG-000004" },
                ]}
              />
            </div>

            {/* Region, Sector, City */}
            {isEdit && (
              <>
                <div className="col-12 col-md-6 col-xxl-4 p-2">
                  <SelectField
                    label={t("dashboard.createEmployee.form.region")}
                    options={[
                      {
                        value: 1,
                        name: t(
                          "dashboard.createEmployee.form.region_middleEast"
                        ),
                      },
                      {
                        value: 2,
                        name: t("dashboard.createEmployee.form.region_europe"),
                      },
                      {
                        value: 3,
                        name: t(
                          "dashboard.createEmployee.form.region_northAmerica"
                        ),
                      },
                    ]}
                  />
                </div>

                <div className="col-12 col-md-6 col-xxl-4 p-2">
                  <SelectField
                    label={t("dashboard.createEmployee.form.sector")}
                    options={[
                      {
                        value: 1,
                        name: t("dashboard.createEmployee.form.country_sa"),
                      },
                      {
                        value: 2,
                        name: t("dashboard.createEmployee.form.country_egypt"),
                      },
                      {
                        value: 3,
                        name: t(
                          "dashboard.createEmployee.form.country_morocco"
                        ),
                      },
                    ]}
                  />
                </div>

                <div className="col-12 col-md-6 col-xxl-4 p-2">
                  <SelectField
                    label={t("dashboard.createEmployee.form.city")}
                    options={[
                      {
                        value: 1,
                        name: t("dashboard.createEmployee.form.city_jeddah"),
                      },
                      {
                        value: 2,
                        name: t("dashboard.createEmployee.form.city_riyadh"),
                      },
                      {
                        value: 3,
                        name: t("dashboard.createEmployee.form.city_madina"),
                      },
                    ]}
                  />
                </div>
              </>
            )}
          </div>
        </FormWrapper>

        {/* Personal Data */}
        <FormWrapper title={t("dashboard.createEmployee.form.personalData")}>
          <div className="row">
            {/* Profile Image */}
            <div className="col-12 p-2">
              <div className="d-flex align-items-center justify-content-center">
                <ProfileImageUploader
                  imageUrl={image}
                  onChange={handleUpload}
                />
              </div>
            </div>

            {/* First Name */}
            <div className="col-12 col-md-6 col-xxl-4 p-2">
              <InputField
                label={t("dashboard.createEmployee.form.firstName")}
                type="text"
                placeholder={t(
                  "dashboard.createEmployee.form.firstName_placeholder"
                )}
              />
            </div>

            {/* Father Name */}
            <div className="col-12 col-md-6 col-xxl-4 p-2">
              <InputField
                label={t("dashboard.createEmployee.form.fatherName")}
                type="text"
                placeholder={t(
                  "dashboard.createEmployee.form.fatherName_placeholder"
                )}
              />
            </div>

            {/* Family Name */}
            <div className="col-12 col-md-6 col-xxl-4 p-2">
              <InputField
                label={t("dashboard.createEmployee.form.familyName")}
                type="text"
                placeholder={t(
                  "dashboard.createEmployee.form.familyName_placeholder"
                )}
              />
            </div>

            {/* Birthdate */}
            <div className="col-12 col-md-6 col-xxl-4 p-2">
              <InputField
                label={t("dashboard.createEmployee.form.birthDate")}
                type="date"
              />
            </div>

            {/* Email */}
            <div className="col-12 col-md-6 col-xxl-4 p-2">
              <InputField
                label={t("dashboard.createEmployee.form.email")}
                type="email"
                placeholder={t(
                  "dashboard.createEmployee.form.email_placeholder"
                )}
              />
            </div>

            {/* Gender */}
            <div className="col-12 col-md-6 col-xxl-4 p-2">
              <SelectField
                label={t("dashboard.createEmployee.form.gender")}
                options={[
                  {
                    value: 1,
                    name: t("dashboard.createEmployee.form.gender_male"),
                  },
                  {
                    value: 2,
                    name: t("dashboard.createEmployee.form.gender_female"),
                  },
                ]}
              />
            </div>

            {/* Residence Country */}
            <div className="col-12 col-md-6 col-xxl-4 p-2">
              <SelectField
                label={t("dashboard.createEmployee.form.residentCountry")}
                options={[
                  {
                    value: 1,
                    name: t("dashboard.createEmployee.form.country_sa"),
                  },
                  {
                    value: 2,
                    name: t("dashboard.createEmployee.form.country_egypt"),
                  },
                  {
                    value: 3,
                    name: t("dashboard.createEmployee.form.country_morocco"),
                  },
                ]}
              />
            </div>

            {/* Residence City */}
            <div className="col-12 col-md-6 col-xxl-4 p-2">
              <SelectField
                label={t("dashboard.createEmployee.form.residentCity")}
                options={[
                  {
                    value: 1,
                    name: t("dashboard.createEmployee.form.city_jeddah"),
                  },
                  {
                    value: 2,
                    name: t("dashboard.createEmployee.form.city_riyadh"),
                  },
                  {
                    value: 3,
                    name: t("dashboard.createEmployee.form.city_madina"),
                  },
                ]}
              />
            </div>

            {/* Nationality */}
            <div className="col-12 col-md-6 col-xxl-4 p-2">
              <SelectField
                label={t("dashboard.createEmployee.form.nationality")}
                options={[
                  {
                    value: 1,
                    name: t("dashboard.createEmployee.form.country_sa"),
                  },
                  {
                    value: 2,
                    name: t("dashboard.createEmployee.form.country_egypt"),
                  },
                  {
                    value: 3,
                    name: t("dashboard.createEmployee.form.country_morocco"),
                  },
                ]}
              />
            </div>

            {/* Attachments */}
            <div className="col-12 p-2">
              <FileUploader
                files={files}
                onFilesChange={handleFilesChange}
                label={t("dashboard.createEmployee.form.attachFiles")}
              />
            </div>

            {/* Buttons */}
            <div className="col-12 p-2">
              <div className="buttons w-full justify-content-end">
                <CustomButton color="secondary" size="large">
                  {t("dashboard.createEmployee.form.cancel")}
                </CustomButton>

                <CustomButton color="primary" size="large">
                  {isEdit
                    ? t("dashboard.createEmployee.form.edit")
                    : t("dashboard.createEmployee.form.save")}
                </CustomButton>
              </div>
            </div>
          </div>
        </FormWrapper>
      </form>
    </>
  );
};

export default EmployerDataForm;
