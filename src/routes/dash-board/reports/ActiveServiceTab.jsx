import { useTranslation } from "react-i18next";
import { useOutletContext } from "react-router";
import Loading from "../../../ui/loading/Loading";
import { useRef } from "react";
import ReportIndicator from "./ReportIndicator";

const ActiveServiceTab = () => {
  const { t } = useTranslation();
  const pdfRef = useRef();
  const langDir = localStorage.getItem("i18nextLng");
  const { performanceReportData, isLoading } = useOutletContext();
  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div ref={pdfRef}>
        <div className="performance-report">
          {/* {filteredData.map((item) => ( */}
          <div className="metrics-list">
            <h3 className="metrics-header">
              {" "}
              {t("dashboard.reports.serviceTab.assistRequestsTitle")}{" "}
            </h3>
            <div className="metrics-container">
              <div className="metric-card-2 position-relative">
                <div className="d-flex align-items-center gap-1">
                  <input type="checkbox" id="totalServices" />
                  <label htmlFor="totalServices">
                    {t("dashboard.reports.serviceTab.totalServices")}{" "}
                  </label>
                </div>
                <h2 className="metric-value">
                  {
                    performanceReportData?.requests_and_offers
                      ?.total_requests_and_offers
                  }
                </h2>
                <span
                  className={`position-absolute bottom-0 text-info p-2 ${
                    langDir == "ar" ? "start-0" : "end-0"
                  }`}
                >
                  [ ]
                </span>
              </div>

              <div className="metric-card-1 position-relative">
                <div className="d-flex align-items-center gap-1">
                  <input type="checkbox" id="totalRequests" />
                  <label htmlFor="totalRequests">
                    {t("dashboard.reports.serviceTab.totalRequests")}{" "}
                  </label>
                </div>{" "}
                <div className="d-flex align-items-center">
                  <h2 className="metric-value">
                    {performanceReportData?.requests_and_offers?.total_requests}
                  </h2>
                  <div className="seperatorDiv"></div>
                  <h2 className="metric-value-ratio">
                    {" "}
                    {
                      performanceReportData?.requests_and_offers
                        ?.requests_growth_rate_percent
                    }
                    %
                  </h2>
                </div>
                <span
                  className={`position-absolute bottom-0 text-info p-2 ${
                    langDir == "ar" ? "start-0" : "end-0"
                  }`}
                >
                  [ ]
                </span>
              </div>
              <div className="metric-card-1 position-relative">
                <div className="d-flex align-items-center gap-1">
                  <input type="checkbox" id="totalOffers" />
                  <label htmlFor="totalOffers">
                    {t("dashboard.reports.serviceTab.totalOffers")}
                  </label>
                </div>{" "}
                <div className="d-flex align-items-center">
                  <h2 className="metric-value">
                    {performanceReportData?.requests_and_offers?.total_offers}
                  </h2>
                  <div className="seperatorDiv"></div>
                  <h2 className="metric-value-ratio">
                    {" "}
                    {
                      performanceReportData?.requests_and_offers
                        ?.offers_growth_rate_percent
                    }
                    %
                  </h2>
                </div>
                <span
                  className={`position-absolute bottom-0 text-info p-2 ${
                    langDir == "ar" ? "start-0" : "end-0"
                  }`}
                >
                  [ ]
                </span>
              </div>
              <div className="metric-card-3">
                <div className="d-flex align-items-center gap-2">
                  <input type="checkbox" id="weeklyTotalServicesChange" />
                  <label htmlFor="weeklyTotalServicesChange">
                    {" "}
                    {t(
                      "dashboard.reports.serviceTab.weeklyTotalServicesChange"
                    )}{" "}
                  </label>
                </div>{" "}
                <p
                  className={`metric-value ${
                    performanceReportData?.requests_and_offers
                      ?.all_growth_rate_percent < 0
                      ? "text-danger"
                      : "text-success"
                  }`}
                >
                  {
                    performanceReportData?.requests_and_offers
                      ?.all_growth_rate_percent
                  }
                  %
                </p>
              </div>
              <div className="metric-card-3">
                <div className="d-flex align-items-center gap-1">
                  <input type="checkbox" id="weeklyRequestChange" />
                  <label htmlFor="weeklyRequestChange">
                    {t("dashboard.reports.serviceTab.weeklyRequestChange")}{" "}
                  </label>
                </div>{" "}
                <p
                  className={`metric-value ${
                    performanceReportData?.requests_and_offers
                      ?.requests_growth_rate_percent < 0
                      ? "text-danger"
                      : "text-success"
                  }`}
                >
                  {
                    performanceReportData?.requests_and_offers
                      ?.requests_growth_rate_percent
                  }
                  %
                </p>
              </div>
              <div className="metric-card-3">
                <div className="d-flex align-items-center gap-2">
                  <input type="checkbox" id="weeklyOfferChange" />
                  <label htmlFor="weeklyOfferChange">
                    {" "}
                    {t("dashboard.reports.serviceTab.weeklyOfferChange")}{" "}
                  </label>
                </div>{" "}
                <p
                  className={`metric-value ${
                    performanceReportData?.requests_and_offers
                      ?.offers_growth_rate_percent < 0
                      ? "text-danger"
                      : "text-success"
                  }`}
                >
                  {
                    performanceReportData?.requests_and_offers
                      ?.offers_growth_rate_percent
                  }
                  %
                </p>
              </div>
            </div>
          </div>
          {/* ))} */}
        </div>

        {/* ألهداف الشخصية بدون مساعدين فردي */}
        <div className="performance-report">
          {/* {filteredData.map((item) => ( */}
          <div className="metrics-list">
            <h3 className="metrics-header">
              {" "}
              {t("dashboard.reports.serviceTab.personalGoalsTitle")}{" "}
            </h3>
            <div className="metrics-container">
              <div className="metric-card-3 position-relative">
                <div className="d-flex align-items-center gap-1">
                  <input type="checkbox" id="totalPersonalGoals" />
                  <label htmlFor="totalPersonalGoals">
                    {" "}
                    {t("dashboard.reports.serviceTab.totalPersonalGoals")}{" "}
                  </label>
                </div>{" "}
                <h2 className="metric-value">
                  {performanceReportData?.goals_data?.all_goals_count}
                </h2>
                <span
                  className={`position-absolute bottom-0 text-info p-2 ${
                    langDir == "ar" ? "start-0" : "end-0"
                  }`}
                >
                  [ ]
                </span>
              </div>
              <div className="metric-card-3 position-relative">
                <div className="d-flex align-items-center gap-1">
                  <input type="checkbox" id="weeklyPersonalGoalsChange" />
                  <label htmlFor="weeklyPersonalGoalsChange">
                    {t(
                      "dashboard.reports.serviceTab.weeklyPersonalGoalsChange"
                    )}{" "}
                  </label>
                </div>{" "}
                <h2
                  className={`metric-value ${
                    performanceReportData?.all_users
                      ?.growth_rate_period_percent < 0
                      ? "text-danger"
                      : "text-success"
                  }`}
                >
                  {performanceReportData?.goals_data?.goals_growth_rate_percent}
                  %
                </h2>
              </div>

              <div className="metric-card-3 position-relative">
                <div className="d-flex align-items-center gap-1">
                  <input type="checkbox" id="pendingGoals" />
                  <label htmlFor="pendingGoals">
                    {t("dashboard.reports.serviceTab.pendingGoals")}{" "}
                  </label>
                </div>{" "}
                <h2 className="metric-value">
                  {performanceReportData?.goals_data?.pending_goals_count}
                </h2>
                <span
                  className={`position-absolute bottom-0 text-info p-2 ${
                    langDir == "ar" ? "start-0" : "end-0"
                  }`}
                >
                  [ ]
                </span>
              </div>

              <div className="metric-card-3 position-relative">
                <div className="d-flex align-items-center gap-1">
                  <input type="checkbox" id="inProgressGoals" />
                  <label htmlFor="inProgressGoals">
                    {t("dashboard.reports.serviceTab.inProgressGoals")}{" "}
                  </label>
                </div>{" "}
                <h2 className="metric-value">
                  {performanceReportData?.goals_data?.progress_goals_count}
                </h2>
                <span
                  className={`position-absolute bottom-0 text-info p-2 ${
                    langDir == "ar" ? "start-0" : "end-0"
                  }`}
                >
                  [ ]
                </span>
              </div>

              <div className="metric-card-3 position-relative">
                <div className="d-flex align-items-center gap-1">
                  <input type="checkbox" id="pausedGoals" />
                  <label htmlFor="pausedGoals">
                    {t("dashboard.reports.serviceTab.pausedGoals")}{" "}
                  </label>
                </div>{" "}
                <h2 className="metric-value">
                  {performanceReportData?.goals_data?.paused_goals_count}
                </h2>
                <span
                  className={`position-absolute bottom-0 text-info p-2 ${
                    langDir == "ar" ? "start-0" : "end-0"
                  }`}
                >
                  [ ]
                </span>
              </div>

              <div className="metric-card-3 position-relative">
                <div className="d-flex align-items-center gap-1">
                  <input type="checkbox" id="completedGoals" />
                  <label htmlFor="completedGoals">
                    {t("dashboard.reports.serviceTab.completedGoals")}{" "}
                  </label>
                </div>{" "}
                <h2 className="metric-value">
                  {performanceReportData?.goals_data?.completed_goals_count}
                </h2>
                <span
                  className={`position-absolute bottom-0 text-info p-2 ${
                    langDir == "ar" ? "start-0" : "end-0"
                  }`}
                >
                  [ ]
                </span>
              </div>
            </div>
          </div>
          {/* ))} */}
        </div>
      </div>

      <ReportIndicator pdfRef={pdfRef} />
    </>
  );
};
export default ActiveServiceTab;
