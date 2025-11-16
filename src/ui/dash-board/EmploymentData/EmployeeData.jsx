import { useTranslation } from "react-i18next";
import FormWrapper from "../../forms/FormWrapper";
import { useSelector } from "react-redux";

const EmployeeData = () => {
  const { t } = useTranslation();
  const { user } = useSelector((state) => state.adminAuth);

  return (
    <FormWrapper title={t("dashboard.employeeProfile.employeeData.title")}>
      <div className="employee__data">
        <div className="row">
          <div className="col-12 col-md-6 col-xxl-4 p-2">
            <div className="employee__data--item">
              <h6>
                {t("dashboard.employeeProfile.employeeData.description")}:
              </h6>
              <p>{user?.role?.title}</p>
            </div>
          </div>
          <div className="col-12 col-md-6 col-xxl-4 p-2">
            <div className="employee__data--item">
              <h6>{t("dashboard.employeeProfile.employeeData.account")}:</h6>
              <p>{user?.code}</p>
            </div>
          </div>
          <div className="col-12 col-md-6 col-xxl-4 p-2">
            <div className="employee__data--item">
              <h6>{t("dashboard.employeeProfile.employeeData.idNumber")}:</h6>
              <p>{user?.id_number}</p>
            </div>
          </div>
          <div className="col-12 col-md-6 col-xxl-4 p-2">
            <div className="employee__data--item">
              <h6>
                {t("dashboard.employeeProfile.employeeData.groupNumber")}:
              </h6>
              <p>{user?.id_number}</p>
            </div>
          </div>
          <div className="col-12 col-md-6 col-xxl-4 p-2">
            <div className="employee__data--item">
              <h6>{t("dashboard.employeeProfile.employeeData.region")}:</h6>
              <p>{user?.region_id?.title}</p>
            </div>
          </div>
          <div className="col-12 col-md-6 col-xxl-4 p-2">
            <div className="employee__data--item">
              <h6>{t("dashboard.employeeProfile.employeeData.location")}:</h6>
              <p>{user?.country_id?.title}</p>
            </div>
          </div>
          <div className="col-12 col-md-6 col-xxl-4 p-2">
            <div className="employee__data--item">
              <h6>{t("dashboard.employeeProfile.employeeData.city")}:</h6>
              <p>{user?.city_id?.title}</p>
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
              <p>{user?.status}</p>
            </div>
          </div>
          <div className="col-12 col-md-6 col-xxl-4 p-2">
            <div className="employee__data--item">
              <h6>
                {t("dashboard.employeeProfile.employeeData.accountStatusDate")}:
              </h6>
              <p>{user?.status_date}</p>
            </div>
          </div>
          <div className="col-12 col-md-6 col-xxl-4 p-2">
            <div className="employee__data--item">
              <h6>
                {t("dashboard.employeeProfile.employeeData.accountStatusTime")}:
              </h6>
              <p>{user?.status_time}</p>
            </div>
          </div>
        </div>
      </div>
    </FormWrapper>
  );
};

export default EmployeeData;
