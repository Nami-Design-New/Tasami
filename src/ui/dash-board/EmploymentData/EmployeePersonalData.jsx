import { useState } from "react";
import { useTranslation } from "react-i18next";
import CustomButton from "../../CustomButton";
import FormWrapper from "../../forms/FormWrapper";
import MapModal from "../../modals/MapModal";
import UpdateDataModal from "../../modals/UpdateDataModal";
import AddTasksModal from "../../website/my-works/tasks/AddTasksModal";
import AddNewTask from "../../../routes/dash-board/tasks/AddNewTask";

const EmployeePersonalData = () => {
  const { t } = useTranslation();
  const defaultBirthday = "2000-01-01";
  const [attachments] = useState([
    {
      id: 1,
      date: "2025-05-25",
      time: "14:45 PM",
      name: "سلطان م",
      account: "E-2202023-000125",
      title: "شهادة تدريب",
      filename: "FFNFCertificate.pdf",
    },
  ]);
  const [showMapModal, setShowMapModal] = useState(false);
  const [showUpdateDataModal, setShowUpdateDataModal] = useState(false);

  return (
    <>
      <FormWrapper
        title={t("dashboard.employeeProfile.employeePersonalData.title")}
      >
        <div className="employee__data">
          <div className="row">
            <div className="col-12 col-md-6 col-xxl-4  p-2">
              <div className="employee__data--item">
                <h6>
                  {t(
                    "dashboard.employeeProfile.employeePersonalData.firstName"
                  )}
                  :
                </h6>
                <p>محمد</p>
              </div>
            </div>
            <div className="col-12 col-md-6 col-xxl-4  p-2">
              <div className="employee__data--item">
                <h6>
                  {t(
                    "dashboard.employeeProfile.employeePersonalData.fatherName"
                  )}
                  :
                </h6>
                <p>رضوان</p>
              </div>
            </div>
            <div className="col-12 col-md-6 col-xxl-4  p-2">
              <div className="employee__data--item">
                <h6>
                  {t(
                    "dashboard.employeeProfile.employeePersonalData.familyName"
                  )}
                  :
                </h6>
                <p>رضوان</p>
              </div>
            </div>
            <div className="col-12 col-md-6 col-xxl-4  p-2">
              <div className="employee__data--item">
                <h6>
                  {t(
                    "dashboard.employeeProfile.employeePersonalData.birthDate"
                  )}
                  :
                </h6>
                <p>{defaultBirthday}</p>
              </div>
            </div>
            <div className="col-12 col-md-6 col-xxl-4  p-2">
              <div className="employee__data--item">
                <h6>
                  {t("dashboard.employeeProfile.employeePersonalData.gender")}:
                </h6>
                <p>ذكر</p>
              </div>
            </div>
            <div className="col-12 col-md-6 col-xxl-4  p-2">
              <div className="employee__data--item">
                <h6>
                  {t(
                    "dashboard.employeeProfile.employeePersonalData.nationality"
                  )}
                  :
                </h6>
                <p>السعوديه</p>
              </div>
            </div>
            <div className="col-12 col-md-6 col-xxl-4  p-2">
              <div className="employee__data--item">
                <h6>
                  {t(
                    "dashboard.employeeProfile.employeePersonalData.residenceCountry"
                  )}
                  :
                </h6>
                <p>السعوديه</p>
              </div>
            </div>
            <div className="col-12 col-md-6 col-xxl-4  p-2">
              <div className="employee__data--item">
                <h6>
                  {t("dashboard.employeeProfile.employeePersonalData.city")}:
                </h6>
                <p>الرياض</p>
              </div>
            </div>
            <div className="col-12 col-md-6 col-xxl-4  p-2">
              <div className="employee__data--item">
                <h6>
                  {t("dashboard.employeeProfile.employeePersonalData.idNumber")}
                  :
                </h6>
                <p>12345678</p>
              </div>
            </div>
            <div className="col-12 col-md-6 col-xxl-4  p-2">
              <div className="employee__data--item">
                <h6>
                  {t(
                    "dashboard.employeeProfile.employeePersonalData.personalEmail"
                  )}
                  :
                </h6>
                <p>mohamed.radwan@tasami.com</p>
              </div>
            </div>
            <div className="col-12 col-md-6 col-xxl-4 p-2 ">
              <div className="employee__data--item">
                <h6>
                  {t("dashboard.employeeProfile.employeePersonalData.address")}:
                </h6>
                <p>السعودية-الرياض</p>
              </div>
            </div>
            <div className="col-12 col-md-6 col-xxl-4  p-2">
              <div className="employee__data--item">
                <h6>
                  {t(
                    "dashboard.employeeProfile.employeePersonalData.nationalAddress"
                  )}
                  :
                </h6>
                <p>السعوديه</p>
              </div>
            </div>

            {/* Attachments Table */}
            <div className="col-12 p-2">
              <div className="employee__data--item w-full">
                <h4 className="attachments-title fs-6 mb-1">
                  {t(
                    "dashboard.employeeProfile.employeePersonalData.attachments"
                  )}
                  :
                </h4>
                <div className="table-container table-responsive border">
                  <table className="custom-table table table-bordered text-center align-middle mb-0 attachments-table">
                    <thead className="table-light">
                      <tr>
                        <th>
                          {t(
                            "dashboard.employeeProfile.employeePersonalData.attachmentDate"
                          )}
                        </th>
                        <th>
                          {t(
                            "dashboard.employeeProfile.employeePersonalData.attachmentTime"
                          )}
                        </th>
                        <th>
                          {t(
                            "dashboard.employeeProfile.employeePersonalData.attachmentFile"
                          )}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {attachments.map((item) => (
                        <tr key={item.id}>
                          <td>{item.date}</td>
                          <td>{item.time}</td>
                          <td>{item.filename}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Update Data Button */}
            <div className="col-12 p-2">
              <CustomButton
                type="button"
                size="large"
                onClick={() => setShowUpdateDataModal(true)}
              >
                {t(
                  "dashboard.employeeProfile.employeePersonalData.updateDataRequest"
                )}
              </CustomButton>
            </div>
          </div>
        </div>

        <MapModal
          title={t("dashboard.employeeProfile.employeePersonalData.mapTitle")}
          showModal={showMapModal}
          setShowModal={setShowMapModal}
          target="companyLocation"
          showLocationFirst={true}
        />

        {/* <UpdateDataModal
          title={t(
            "dashboard.employeeProfile.employeePersonalData.updateDataTitle"
          )}
          setShowModal={setShowUpdateDataModal}
          showModal={showUpdateDataModal}
        /> */}

        <AddNewTask
          setShowModal={setShowUpdateDataModal}
          showModal={showUpdateDataModal}
        />
      </FormWrapper>
    </>
  );
};

export default EmployeePersonalData;
