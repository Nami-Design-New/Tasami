import { useTranslation } from "react-i18next";
import { useOutletContext } from "react-router";
import Loading from "./../../../ui/loading/Loading";
import { useRef, useState } from "react";
import ReportIndicator from "./ReportIndicator";

const ActiveUserTab = () => {
  const { t } = useTranslation();
  const pdfRef = useRef();
  const [checked, setChecked] = useState(false);

  const { performanceReportData, isLoading } = useOutletContext();
  if (isLoading) {
    return <Loading />;
  }

  const toggleCheck = () => {
    setChecked((prev) => !prev);
  };
  return (
    <>
      <div ref={pdfRef}>
        {" "}
        <div className="performance-report">
          {/* {filteredData.map((item) => ( */}
          <div className="metrics-list">
            <h3 className="metrics-header">
              {" "}
              {t("dashboard.reports.usersTab.users")}{" "}
            </h3>
            <div className="metrics-container">
              <div
                onClick={toggleCheck}
                className="metric-card-2 cursor-pointer"
              >
                <div className="d-flex align-items-center gap-1">
                  <input
                    type="checkbox"
                    id="total_user"
                    checked={checked}
                    onChange={toggleCheck}
                  />
                  <label htmlFor="total_user">
                    {t("dashboard.reports.usersTab.totalUsers")}{" "}
                  </label>
                </div>
                <h2 className="metric-value">
                  {performanceReportData?.all_users?.all_users_count}
                </h2>
              </div>

              <div className="metric-card-1">
                <div className="d-flex align-items-center gap-1">
                  <input type="checkbox" id="active_user" />
                  <label htmlFor="active_user">
                    {t("dashboard.reports.usersTab.activeUsers")}{" "}
                  </label>
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
                  <label htmlFor="inactive_user">
                    {t("dashboard.reports.usersTab.inactiveUsers")}{" "}
                  </label>
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
                  <input type="checkbox" id="blocked_user" />
                  <label htmlFor="blocked_user">
                    {t("dashboard.reports.usersTab.blockedUsers")}{" "}
                  </label>
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
                    {t("dashboard.reports.usersTab.weeklyUserChange")}{" "}
                  </label>
                </div>{" "}
                <p
                  className={`metric-value ${
                    performanceReportData?.all_users
                      ?.growth_rate_period_percent < 0
                      ? "text-danger"
                      : "text-success"
                  }`}
                >
                  {performanceReportData?.all_users?.growth_rate_period_percent}
                  %{" "}
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
            <h3 className="metrics-header">
              {" "}
              {t("dashboard.reports.usersTab.beneficiaries")}{" "}
            </h3>
            <div className="metrics-container">
              <div className="metric-card-2">
                <div className="d-flex align-items-center gap-1">
                  <input type="checkbox" id="totalBeneficiaries" />
                  <label htmlFor="totalBeneficiaries">
                    {" "}
                    {t("dashboard.reports.usersTab.totalBeneficiaries")}
                  </label>
                </div>
                <h2 className="metric-value">
                  {
                    performanceReportData?.beneficiaries
                      ?.all_beneficiaries_count
                  }
                </h2>
              </div>

              <div className="metric-card-1">
                <div className="d-flex align-items-center gap-1">
                  <input type="checkbox" id="activeBeneficiaries" />
                  <label htmlFor="activeBeneficiaries">
                    {t("dashboard.reports.usersTab.activeBeneficiaries")}{" "}
                  </label>
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
                  <input type="checkbox" id="inactiveBeneficiaries" />
                  <label htmlFor="inactiveBeneficiaries">
                    {t("dashboard.reports.usersTab.inactiveBeneficiaries")}{" "}
                  </label>
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
                  <input type="checkbox" id="blockedBeneficiaries" />
                  <label htmlFor="blockedBeneficiaries">
                    {t("dashboard.reports.usersTab.blockedBeneficiaries")}
                  </label>
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
                  <input type="checkbox" id="beneficiariesRatio" />
                  <label htmlFor="beneficiariesRatio">
                    {t("dashboard.reports.usersTab.beneficiariesRatio")}{" "}
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
                  <input type="checkbox" id="weeklyBeneficiaryChange" />
                  <label htmlFor="weeklyBeneficiaryChange">
                    {t("dashboard.reports.usersTab.weeklyBeneficiaryChange")}{" "}
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
            <h3 className="metrics-header">
              {" "}
              {t("dashboard.reports.usersTab.helpers")}
            </h3>
            <div className="metrics-container">
              <div className="metric-card-2">
                <div className="d-flex align-items-center gap-1">
                  <input type="checkbox" id="totalHelpers" />
                  <label htmlFor="totalHelpers">
                    {" "}
                    {t("dashboard.reports.usersTab.totalHelpers")}{" "}
                  </label>
                </div>
                <h2 className="metric-value">
                  {performanceReportData?.helpers?.all_helpers_count}
                </h2>
              </div>
              {performanceReportData?.helpers?.packages.map((item) => (
                <div key={item.main_package_id} className="metric-card-1">
                  <div className="d-flex align-items-center gap-1">
                    <input type="checkbox" id={item.package_name} />
                    <label htmlFor={item.package_name}>
                      {item.package_name}{" "}
                    </label>
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
                  <input type="checkbox" id="helpersRatio" />
                  <label htmlFor="helpersRatio">
                    {t("dashboard.reports.usersTab.helpersRatio")}{" "}
                  </label>
                </div>{" "}
                <h2 className="metric-value">
                  {performanceReportData?.helpers?.helpers_percent_of_all}%
                </h2>
              </div>
              <div className="metric-card-3">
                <div className="d-flex align-items-center gap-2">
                  <input type="checkbox" id="weeklyHelpersChange" />
                  <label htmlFor="weeklyHelpersChange">
                    {t("dashboard.reports.usersTab.weeklyHelpersChange")}{" "}
                  </label>
                </div>{" "}
                <h2
                  className={`metric-value ${
                    performanceReportData?.helpers?.growth_rate_period_percent <
                    0
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
            <div key={item.main_package_id} className=" metrics-container2">
              <div className="metric-card">
                <div className="d-flex align-items-center gap-1">
                  <input type="checkbox" id="activeHelpers" />
                  <label htmlFor="activeHelpers">
                    {t("dashboard.reports.usersTab.activeHelpers")}{" "}
                    {item.package_name}{" "}
                  </label>
                </div>{" "}
                <h2 className="metric-value">{item.active_count}</h2>
              </div>
              <div className="metric-card">
                <div className="d-flex align-items-center gap-1">
                  <input type="checkbox" id="inactiveHelpers" />
                  <label htmlFor="inactiveHelpers">
                    {t("dashboard.reports.usersTab.inactiveHelpers")}{" "}
                    {item.package_name}{" "}
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
                  <input type="checkbox" id="blockedHelpers" />
                  <label htmlFor="blockedHelpers">
                    {t("dashboard.reports.usersTab.blockedHelpers")}
                    {item.package_name}{" "}
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
                  <input type="checkbox" id="weeklyHelpersChange" />
                  <label htmlFor="weeklyHelpersChange">
                    {t("dashboard.reports.usersTab.weeklyHelpersChange")}{" "}
                    {item.package_name}{" "}
                  </label>
                </div>{" "}
                <h2
                  className={`metric-value ${
                    item.growth_rate_percent < 0
                      ? "text-danger"
                      : "text-success"
                  }`}
                >
                  {item.growth_rate_percent}%
                </h2>
              </div>
            </div>
          ))}

          {/* ))} */}
        </div>
      </div>
      <ReportIndicator pdfRef={pdfRef} />
    </>
  );
};
export default ActiveUserTab;
