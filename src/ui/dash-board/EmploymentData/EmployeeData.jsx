import { useTranslation } from "react-i18next";
import FormWrapper from "../../forms/FormWrapper";

const EmployeeData = () => {
  const { t } = useTranslation();

  return (
    <FormWrapper title={t("dashboard.employeeProfile.employeeData.title")}>
      <div className="employee__data">
        <div className="row">
          <div className="col-12 col-md-6 col-xxl-4 p-2">
            <div className="employee__data--item">
              <h6>
                {t("dashboard.employeeProfile.employeeData.description")}:
              </h6>
              <p>تنفيذي</p>
            </div>
          </div>
          <div className="col-12 col-md-6 col-xxl-4 p-2">
            <div className="employee__data--item">
              <h6>{t("dashboard.employeeProfile.employeeData.account")}:</h6>
              <p>S-120122-000001</p>
            </div>
          </div>
          <div className="col-12 col-md-6 col-xxl-4 p-2">
            <div className="employee__data--item">
              <h6>{t("dashboard.employeeProfile.employeeData.idNumber")}:</h6>
              <p>01-014-005</p>
            </div>
          </div>
          <div className="col-12 col-md-6 col-xxl-4 p-2">
            <div className="employee__data--item">
              <h6>
                {t("dashboard.employeeProfile.employeeData.groupNumber")}:
              </h6>
              <p>01-014-005</p>
            </div>
          </div>
          <div className="col-12 col-md-6 col-xxl-4 p-2">
            <div className="employee__data--item">
              <h6>{t("dashboard.employeeProfile.employeeData.region")}:</h6>
              <p>الشرق الأوسط</p>
            </div>
          </div>
          <div className="col-12 col-md-6 col-xxl-4 p-2">
            <div className="employee__data--item">
              <h6>{t("dashboard.employeeProfile.employeeData.location")}:</h6>
              <p>السعودية</p>
            </div>
          </div>
          <div className="col-12 col-md-6 col-xxl-4 p-2">
            <div className="employee__data--item">
              <h6>{t("dashboard.employeeProfile.employeeData.city")}:</h6>
              <p>الرياض</p>
            </div>
          </div>
          <div className="col-12 col-md-6 col-xxl-4 p-2">
            <div className="employee__data--item">
              <h6>{t("dashboard.employeeProfile.employeeData.hireDate")}:</h6>
              <p>12-Jan-22</p>
            </div>
          </div>
          <div className="col-12 col-md-6 col-xxl-4 p-2">
            <div className="employee__data--item">
              <h6>
                {t("dashboard.employeeProfile.employeeData.accountStatus")}:
              </h6>
              <p>نشط</p>
            </div>
          </div>
          <div className="col-12 col-md-6 col-xxl-4 p-2">
            <div className="employee__data--item">
              <h6>
                {t("dashboard.employeeProfile.employeeData.accountStatusDate")}:
              </h6>
              <p>15-07-2024</p>
            </div>
          </div>
          <div className="col-12 col-md-6 col-xxl-4 p-2">
            <div className="employee__data--item">
              <h6>
                {t("dashboard.employeeProfile.employeeData.accountStatusTime")}:
              </h6>
              <p>08:55</p>
            </div>
          </div>
        </div>
      </div>
    </FormWrapper>
  );
};

export default EmployeeData;
