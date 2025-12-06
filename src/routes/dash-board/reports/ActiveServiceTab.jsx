import { useTranslation } from "react-i18next";
import { useOutletContext } from "react-router";
import CustomButton from "../../../ui/CustomButton";
import Loading from "../../../ui/loading/Loading";

const ActiveServiceTab = () => {
  const { t } = useTranslation();
  const { performanceReportData, isLoading, search_type } = useOutletContext();
  if (isLoading) {
    return <Loading />;
  }
  if (performanceReportData?.length === 0)
    return (
      <div className="performance-no-report-data">
        <div className="performance-no-report-data__icon">
          <i className="fa-light fa-chart-pie"></i>
        </div>
        <h6>لم يتم إنشاء تقرير بعد</h6>
        <p>
          قم بتحديد المعايير المطلوبة واضغط على زر &quot;معاينه التقرير&quot;
          لعرض النتائج
        </p>
      </div>
    );

  return (
    <>
      <div className="performance-report">
        {/* {filteredData.map((item) => ( */}
        <div className="metrics-list">
          <h3 className="metrics-header"> طلبات وعروض المساعدة </h3>
          <div className="metrics-container">
            <div className="metric-card-2 position-relative">
              <div className="d-flex align-items-center gap-1">
                <input type="checkbox" id="total_user" />
                <label htmlFor="total_user">
                  العدد اإلجمالي للخدمات المنشورة في صفحة االنطالق{" "}
                </label>
              </div>
              <h2 className="metric-value">
                {
                  performanceReportData?.requests_and_offers
                    ?.total_requests_and_offers
                }
              </h2>
              <span className="position-absolute bottom-0 start-0 text-info p-2">
                [ ]
              </span>
            </div>

            <div className="metric-card-1 position-relative">
              <div className="d-flex align-items-center gap-1">
                <input type="checkbox" id="active_user" />
                <label htmlFor="active_user">
                  عدد طلبات المساعدة المنشورة{" "}
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
              <span className="position-absolute bottom-0 start-0 text-info p-2">
                [ ]
              </span>
            </div>
            <div className="metric-card-1 position-relative">
              <div className="d-flex align-items-center gap-1">
                <input type="checkbox" id="active_user" />
                <label htmlFor="active_user">عدد عروض المساعدة المنشورة</label>
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
              <span className="position-absolute bottom-0 start-0 text-info p-2">
                [ ]
              </span>
            </div>
            <div className="metric-card-1">
              <div className="d-flex align-items-center gap-1">
                <input type="checkbox" id="inactive_user" />
                <label htmlFor="inactive_user">
                  معدل التغير األسبوعي في عدد طلبات المساعدة{" "}
                </label>
              </div>{" "}
              <p
                className={`metric-value ${
                  performanceReportData?.requests_and_offers?.requests_growth_rate_percent <
                  0
                    ? "text-danger"
                    : "text-success"
                }`}
              >
                {performanceReportData?.requests_and_offers?.requests_growth_rate_percent}%
              </p>
            </div>
            <div className="metric-card-3">
              <div className="d-flex align-items-center gap-2">
                <input type="checkbox" id="weekly_change_user " />
                <label htmlFor="weekly_change_user  ">
                  {" "}
                  معدل التغير األسبوعي في عدد عروض المساعدة{" "}
                </label>
              </div>{" "}
              <p
                className={`metric-value ${
                  performanceReportData?.requests_and_offers?.offers_growth_rate_percent <
                  0
                    ? "text-danger"
                    : "text-success"
                }`}
              >
                {performanceReportData?.requests_and_offers?.offers_growth_rate_percent}%
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
            األهداف الشخصية بدون مساعدين فردية{" "}
          </h3>
          <div className="metrics-container">
            <div className="metric-card-3 position-relative">
              <div className="d-flex align-items-center gap-1">
                <input type="checkbox" id="active_user" />
                <label htmlFor="active_user">عدد األهداف الشخصية الفردية</label>
              </div>{" "}
              <h2 className="metric-value">
                {performanceReportData?.goals_data?.all_goals_count}
              </h2>
              <span className="position-absolute bottom-0 start-0 text-info p-2">
                [ ]
              </span>
            </div>
            <div className="metric-card-3 position-relative">
              <div className="d-flex align-items-center gap-1">
                <input type="checkbox" id="active_user" />
                <label htmlFor="active_user">
                  معدل التغير األسبوعي في عدد األهداف الفردية
                </label>
              </div>{" "}
              <h2
                className={`metric-value ${
                  performanceReportData?.all_users?.growth_rate_period_percent <
                  0
                    ? "text-danger"
                    : "text-success"
                }`}
              >
                {performanceReportData?.goals_data?.goals_growth_rate_percent}%
              </h2>
            </div>

            <div className="metric-card-3 position-relative">
              <div className="d-flex align-items-center gap-1">
                <input type="checkbox" id="active_user" />
                <label htmlFor="active_user">
                  عدد األهداف الفردية بانتظار التنفيذ
                </label>
              </div>{" "}
              <h2 className="metric-value">
                {performanceReportData?.goals_data?.pending_goals_count}
              </h2>
              <span className="position-absolute bottom-0 start-0 text-info p-2">
                [ ]
              </span>
            </div>

            <div className="metric-card-3 position-relative">
              <div className="d-flex align-items-center gap-1">
                <input type="checkbox" id="active_user" />
                <label htmlFor="active_user">
                  عدد األهداف الفردية قيد التنفيذ
                </label>
              </div>{" "}
              <h2 className="metric-value">
                {performanceReportData?.goals_data?.progress_goals_count}
              </h2>
              <span className="position-absolute bottom-0 start-0 text-info p-2">
                [ ]
              </span>
            </div>

            <div className="metric-card-3 position-relative">
              <div className="d-flex align-items-center gap-1">
                <input type="checkbox" id="active_user" />
                <label htmlFor="active_user">
                  عدد األهداف الفردية المتوقفة
                </label>
              </div>{" "}
              <h2 className="metric-value">
                {performanceReportData?.goals_data?.paused_goals_count}
              </h2>
              <span className="position-absolute bottom-0 start-0 text-info p-2">
                [ ]
              </span>
            </div>

            <div className="metric-card-3 position-relative">
              <div className="d-flex align-items-center gap-1">
                <input type="checkbox" id="active_user" />
                <label htmlFor="active_user">
                  عدد األهداف الفردية المكتملة
                </label>
              </div>{" "}
              <h2 className="metric-value">
                {performanceReportData?.goals_data?.completed_goals_count}
              </h2>
              <span className="position-absolute bottom-0 start-0 text-info p-2">
                [ ]
              </span>
            </div>
          </div>
        </div>
        {/* ))} */}
      </div>

      <div className="d-flex justify-content-between align-items-center p-5">
        <div className="d-flex justify-content-between align-items-center gap-5">
          <div className="d-flex align-items-center gap-2">
            <div className="overall_index"></div>
            <span>مؤشر إجمالي</span>
          </div>
          <div className="d-flex align-items-center gap-2">
            <div className="detailed_index"></div>
            <span>مؤشر تفصيلي </span>
          </div>
          <div className="d-flex align-items-center gap-2">
            <div className="general_index"></div>
            <span>مؤشر عام</span>
          </div>
        </div>
        <div className="d-flex p-2 justify-content-end  align-items-end mt-3 ">
          <CustomButton size="large"> تصدير</CustomButton>
        </div>
      </div>
    </>
  );
};
export default ActiveServiceTab;
