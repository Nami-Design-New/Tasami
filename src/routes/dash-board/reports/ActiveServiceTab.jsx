import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import CustomButton from "../../../ui/CustomButton";

const ActiveServiceTab = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { metrics, filteredData } = useSelector((state) => state.filter);
  const activeUsers = filteredData.filter((item) => item.status === "active");

  const routeKey =
    location.pathname.split("/").pop().toString().split("")[0].toUpperCase() +
    location.pathname.split("/").pop().toString().slice(1);

  if (filteredData.length === 0)
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
            <div className="metric-card-2">
              <div className="d-flex align-items-center gap-1">
                <input type="checkbox" id="total_user" />
                <label htmlFor="total_user">
                  العدد اإلجمالي للخدمات المنشورة في صفحة االنطالق{" "}
                </label>
              </div>
              <h2 className="metric-value">1200</h2>
              <span className="position-absolute bottom-0 left-0 text-info">[ ]</span>
            </div>

            <div className="metric-card-1">
              <div className="d-flex align-items-center gap-1">
                <input type="checkbox" id="active_user" />
                <label htmlFor="active_user">عدد المستخدمون النشطين</label>
              </div>{" "}
              <div className="d-flex align-items-center">
                <h2 className="metric-value">560</h2>
                <div className="seperatorDiv"></div>
                <h2 className="metric-value-ratio">30%</h2>
              </div>
            </div>
            <div className="metric-card-1">
              <div className="d-flex align-items-center gap-1">
                <input type="checkbox" id="inactive_user" />
                <label htmlFor="inactive_user">عدد المستخدمون الخاملين</label>
              </div>{" "}
              <div className="d-flex align-items-center">
                <h2 className="metric-value">560</h2>
                <div className="seperatorDiv"></div>
                <h2 className="metric-value-ratio">30%</h2>
              </div>
            </div>
            <div className="metric-card-3">
              <div className="d-flex align-items-center gap-2">
                <input type="checkbox" id="weekly_change_user " />
                <label htmlFor="weekly_change_user  ">
                  {" "}
                  عدل التغير األسبوعي في عدد المستخدمين اإلجمالي{" "}
                </label>
              </div>{" "}
              <div className="d-flex align-items-center">
                <h2 className="metric-value">560</h2>
                <div className="seperatorDiv"></div>
                <h2 className="metric-value-ratio">30%</h2>
              </div>
            </div>
          </div>
        </div>
        {/* ))} */}
      </div>

      {/* المستفيدون */}
      <div className="performance-report">
        {/* {filteredData.map((item) => ( */}
        <div className="metrics-list">
          <h3 className="metrics-header"> األهداف الشخصية بدون مساعدين فردية </h3>
          <div className="metrics-container">
            <div className="metric-card-2">
              <div>
                <p className="metric-title">عدد المستخدمون الاجمالي</p>
              </div>
              <h2 className="metric-value">1200</h2>
            </div>

            <div className="metric-card-1">
              <p className="metric-title">عدد المستخدمون النشطين</p>
              <div className="d-flex align-items-center">
                <h2 className="metric-value">560</h2>
                <div className="seperatorDiv"></div>
                <h2 className="metric-value-ratio">30%</h2>
              </div>
            </div>
            <div className="metric-card-1">
              <p className="metric-title">عدد المستخدمون الخاملين</p>
              <div className="d-flex align-items-center">
                <h2 className="metric-value">560</h2>
                <div className="seperatorDiv"></div>
                <h2 className="metric-value-ratio">30%</h2>
              </div>
            </div>
            <div className="metric-card-3">
              <p className="metric-title">
                عدل التغير األسبوعي في عدد المستخدمين اإلجمالي
              </p>
              <div className="d-flex align-items-center">
                <h2 className="metric-value">560</h2>
                <div className="seperatorDiv"></div>
                <h2 className="metric-value-ratio">30%</h2>
              </div>
            </div>
            <div className="metric-card-3">
              <p className="metric-title">
                عدل التغير األسبوعي في عدد المستخدمين اإلجمالي
              </p>
              <div className="d-flex align-items-center">
                <h2 className="metric-value">560</h2>
                <div className="seperatorDiv"></div>
                <h2 className="metric-value-ratio">30%</h2>
              </div>
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
