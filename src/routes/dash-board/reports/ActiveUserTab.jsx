import { useTranslation } from "react-i18next";
import { useOutletContext } from "react-router";
import CustomButton from "../../../ui/CustomButton";
import Loading from "./../../../ui/loading/Loading";

const ActiveUserTab = () => {
  const { t } = useTranslation();
  const { performanceReportData, isLoading, search_type } = useOutletContext();
  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className="performance-report">
        {/* {filteredData.map((item) => ( */}
        <div className="metrics-list">
          <h3 className="metrics-header"> المستخدمون </h3>
          <div className="metrics-container">
            <div className="metric-card-2">
              <div className="d-flex align-items-center gap-1">
                <input type="checkbox" id="total_user" />
                <label htmlFor="total_user">عدد المستخدمون الاجمالي</label>
              </div>
              <h2 className="metric-value">
                {performanceReportData?.all_users?.all_users_count}
              </h2>
            </div>

            <div className="metric-card-1">
              <div className="d-flex align-items-center gap-1">
                <input type="checkbox" id="active_user" />
                <label htmlFor="active_user">عدد المستخدمون النشطين</label>
              </div>{" "}
              <div className="d-flex align-items-center">
                <h2 className="metric-value">
                  {performanceReportData?.all_users?.active_users_count}
                </h2>
                <div className="seperatorDiv"></div>
                <h2 className="metric-value-ratio">
                  {performanceReportData?.all_users?.active_users_percent}%
                </h2>
              </div>
            </div>
            <div className="metric-card-1">
              <div className="d-flex align-items-center gap-1">
                <input type="checkbox" id="inactive_user" />
                <label htmlFor="inactive_user">عدد المستخدمون الخاملين</label>
              </div>{" "}
              <div className="d-flex align-items-center">
                <h2 className="metric-value">
                  {performanceReportData?.all_users?.unactive_users_count}
                </h2>
                <div className="seperatorDiv"></div>
                <h2 className="metric-value-ratio">
                  {performanceReportData?.all_users?.unactive_users_percent}%
                </h2>
              </div>
            </div>
            <div className="metric-card-1">
              <div className="d-flex align-items-center gap-1">
                <input type="checkbox" id="inactive_user" />
                <label htmlFor="inactive_user">عدد المستخدمون الموقوفين</label>
              </div>{" "}
              <div className="d-flex align-items-center">
                <h2 className="metric-value">
                  {performanceReportData?.all_users?.blocked_users_count}
                </h2>
                <div className="seperatorDiv"></div>
                <h2 className="metric-value-ratio">
                  {performanceReportData?.all_users?.blocked_users_percent}%
                </h2>
              </div>
            </div>

            <div className="metric-card-3">
              <div className="d-flex align-items-center gap-2">
                <input type="checkbox" id="weekly_change_user " />
                <label htmlFor="weekly_change_user  ">
                  {" "}
                  عدل التغير األسبوعي في عدد المستخدمين الاجمالي{" "}
                </label>
              </div>{" "}
              <p
                className={`metric-value ${
                  performanceReportData?.all_users?.growth_rate_period_percent <
                  0
                    ? "text-danger"
                    : "text-success"
                }`}
              >
                {performanceReportData?.all_users?.growth_rate_period_percent}%{" "}
              </p>
            </div>
          </div>
        </div>
        {/* ))} */}
      </div>

      {/* المستفيدون */}
      <div className="performance-report">
        {/* {filteredData.map((item) => ( */}
        <div className="metrics-list">
          <h3 className="metrics-header"> المستفيدون </h3>
          <div className="metrics-container">
            <div className="metric-card-2">
              <div className="d-flex align-items-center gap-1">
                <input type="checkbox" id="total_user" />
                <label htmlFor="total_user">عدد المستفيدين الاجمالي</label>
              </div>
              <h2 className="metric-value">
                {performanceReportData?.beneficiaries?.all_beneficiaries_count}
              </h2>
            </div>

            <div className="metric-card-1">
              <div className="d-flex align-items-center gap-1">
                <input type="checkbox" id="active_user" />
                <label htmlFor="active_user">عدد المستفيدين النشطين</label>
              </div>{" "}
              <div className="d-flex align-items-center">
                <h2 className="metric-value">
                  {
                    performanceReportData?.beneficiaries
                      ?.active_beneficiaries_count
                  }
                </h2>
                <div className="seperatorDiv"></div>
                <h2 className="metric-value-ratio">
                  {
                    performanceReportData?.beneficiaries
                      ?.active_beneficiaries_percent
                  }
                  %
                </h2>
              </div>
            </div>
            <div className="metric-card-1">
              <div className="d-flex align-items-center gap-1">
                <input type="checkbox" id="inactive_user" />
                <label htmlFor="inactive_user">عدد المستفيدين الخاملين</label>
              </div>{" "}
              <div className="d-flex align-items-center">
                <h2 className="metric-value">
                  {
                    performanceReportData?.beneficiaries
                      ?.unactive_beneficiaries_count
                  }
                </h2>
                <div className="seperatorDiv"></div>
                <h2 className="metric-value-ratio">
                  {
                    performanceReportData?.beneficiaries
                      ?.unactive_beneficiaries_percent
                  }
                  %
                </h2>
              </div>
            </div>
            <div className="metric-card-1">
              <div className="d-flex align-items-center gap-1">
                <input type="checkbox" id="inactive_user" />
                <label htmlFor="inactive_user">عدد المستفيدين الموقوفين</label>
              </div>{" "}
              <div className="d-flex align-items-center">
                <h2 className="metric-value">
                  {
                    performanceReportData?.beneficiaries
                      ?.blocked_beneficiaries_count
                  }
                </h2>
                <div className="seperatorDiv"></div>
                <h2 className="metric-value-ratio">
                  {
                    performanceReportData?.beneficiaries
                      ?.blocked_beneficiaries_percent
                  }
                  %
                </h2>
              </div>
            </div>

            <div className="metric-card-3">
              <div className="d-flex align-items-center gap-2">
                <input type="checkbox" id="weekly_change_user " />
                <label htmlFor="weekly_change_user  ">
                  نسبة عدد المستفيدين إلى عدد المستخدمين الاجمالي
                </label>
              </div>{" "}
              <h2 className="metric-value">
                {
                  performanceReportData?.beneficiaries
                    ?.beneficiaries_percent_of_all
                }
                %
              </h2>
            </div>
            <div className="metric-card-3">
              <div className="d-flex align-items-center gap-2">
                <input type="checkbox" id="weekly_change_user " />
                <label htmlFor="weekly_change_user  ">
                  معدل التغير األسبوعي في عدد المستفيدين الاجمالي
                </label>
              </div>{" "}
              <h2
                className={`metric-value ${
                  performanceReportData?.beneficiaries
                    ?.growth_rate_period_percent < 0
                    ? "text-danger"
                    : "text-success"
                }`}
              >
                {
                  performanceReportData?.beneficiaries
                    ?.growth_rate_period_percent
                }
                %
              </h2>
            </div>
          </div>
        </div>
        {/* ))} */}
      </div>
      {/* المساعدون الشخصيون )1 من 2( */}
      <div className="performance-report">
        {/* {filteredData.map((item) => ( */}
        <div className="metrics-list">
          <h3 className="metrics-header"> المساعدون الشخصيون من 1 الي 2</h3>
          <div className="metrics-container">
            <div className="metric-card-2">
              <div className="d-flex align-items-center gap-1">
                <input type="checkbox" id="total_user" />
                <label htmlFor="total_user"> عدد المساعدين الاجمالي </label>
              </div>
              <h2 className="metric-value">
                {performanceReportData?.helpers?.all_helpers_count}
              </h2>
            </div>
            {performanceReportData?.helpers?.packages.map((item) => (
              <div className="metric-card-1">
                <div className="d-flex align-items-center gap-1">
                  <input type="checkbox" id="active_user" />
                  <label htmlFor="active_user">{item.package_name} </label>
                </div>{" "}
                <div className="d-flex align-items-center">
                  <h2 className="metric-value">{item.helpers_count}</h2>
                  <div className="seperatorDiv"></div>
                  <h2 className="metric-value-ratio">
                    {item.percent_of_helpers}%
                  </h2>
                </div>
              </div>
            ))}

            <div className="metric-card-3">
              <div className="d-flex align-items-center gap-2">
                <input type="checkbox" id="weekly_change_user " />
                <label htmlFor="weekly_change_user  ">
                  نسبة عدد المساعدين إلى عدد المستخدمين الاجمالي{" "}
                </label>
              </div>{" "}
              <h2 className="metric-value">
                {performanceReportData?.helpers?.helpers_percent_of_all}%
              </h2>
            </div>
            <div className="metric-card-3">
              <div className="d-flex align-items-center gap-2">
                <input type="checkbox" id="weekly_change_user " />
                <label htmlFor="weekly_change_user  ">
                  معدل التغير األسبوعي في عدد المساعدين الاجمالي{" "}
                </label>
              </div>{" "}
              <h2
                className={`metric-value ${
                  performanceReportData?.helpers?.growth_rate_period_percent < 0
                    ? "text-danger"
                    : "text-success"
                }`}
              >
                {performanceReportData?.helpers?.growth_rate_period_percent}%
              </h2>
            </div>
          </div>
        </div>
        {/*  للحسابات األساسية*/}

        {performanceReportData?.helpers?.packages.map((item) => (
          <div className=" metrics-container2">
            <div className="metric-card">
              <div className="d-flex align-items-center gap-1">
                <input type="checkbox" id="active_user" />
                <label htmlFor="active_user">
                  عدد المساعدين النشطين {item.package_name}{" "}
                </label>
              </div>{" "}
              <h2 className="metric-value">{item.active_count}</h2>
            </div>
            <div className="metric-card">
              <div className="d-flex align-items-center gap-1">
                <input type="checkbox" id="active_user" />
                <label htmlFor="active_user">
                  عدد المساعدين الخاملين {item.package_name}{" "}
                </label>
              </div>{" "}
              <div className="d-flex align-items-center">
                <h2 className="metric-value">{item.inactive_count}</h2>
                <div className="seperatorDiv"></div>
                <h2 className="metric-value-ratio">{item.inactive_count}%</h2>
              </div>
            </div>
            <div className="metric-card">
              <div className="d-flex align-items-center gap-1">
                <input type="checkbox" id="active_user" />
                <label htmlFor="active_user">
                  عدد المساعدين الموقوفين {item.package_name}{" "}
                </label>
              </div>{" "}
              <div className="d-flex align-items-center">
                <h2 className="metric-value">{item.blocked_count}</h2>
                <div className="seperatorDiv"></div>
                <h2 className="metric-value-ratio">{item.blocked_count}%</h2>
              </div>
            </div>
            <div className="metric-card">
              <div className="d-flex align-items-center gap-2">
                <input type="checkbox" id="weekly_change_user " />
                <label htmlFor="weekly_change_user  ">
                  معدل التغير األسبوعي في عدد المساعدين الاجمالي{" "}
                  {item.package_name}{" "}
                </label>
              </div>{" "}
              <h2
                className={`metric-value ${
                  item.growth_rate_percent < 0 ? "text-danger" : "text-success"
                }`}
              >
                {item.growth_rate_percent}%
              </h2>
            </div>
          </div>
        ))}

        {/* ))} */}
      </div>
      <div className="d-flex justify-content-between align-items-center p-5">
        <div className="d-flex justify-content-between align-items-center gap-5">
          <div className="d-flex align-items-center gap-2">
            <div className="overall_index"></div>
            <span> {t("dashboard.reports.total")}</span>
          </div>
          <div className="d-flex align-items-center gap-2">
            <div className="detailed_index"></div>
            <span> {t("dashboard.reports.detailed")}</span>
          </div>
          <div className="d-flex align-items-center gap-2">
            <div className="general_index"></div>
            <span> {t("dashboard.reports.general")}</span>
          </div>
        </div>
        <div className="d-flex p-2 justify-content-end  align-items-end mt-3 ">
          <CustomButton size="large">
            {" "}
            {t("dashboard.reports.export")}
          </CustomButton>
        </div>
      </div>
    </>
  );
};
export default ActiveUserTab;
