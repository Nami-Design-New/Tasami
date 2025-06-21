import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";

const ActiveTab = () => {
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
    <div className="performance-report">
      <div className=" performance-report__header--container ">
        <h2 className=" performance-report__header ">
          نتائج التقرير - {t(`pageHeaders.${routeKey}`)}
        </h2>
        <p> مقاييس ورؤى تفصيلية في الفتره من 2023 الي 2024. </p>
      </div>

      {/* {filteredData.map((item) => ( */}
      <div className="metrics-list">
        <h3 className="metrics-header"> السعوديه </h3>
        <div className="metrics-container">
          <div className="metric-card">
            <p className="metric-title">عدد المشتركين الاجمالي</p>
            <h2 className="metric-value">1200</h2>
          </div>

          <div className="metric-card">
            <p className="metric-title">عدد مقدمي الخدمات و البرامج الاجمالي</p>
            <h2 className="metric-value">560</h2>
          </div>

          <div className="metric-card">
            <p className="metric-title">
              نسبه مقدمي الخدمات و البرامج الي المشتركين
            </p>
            <h2 className="metric-value">87%</h2>
          </div>
          <div className="metric-card">
            <p className="metric-title">
              نسبه مقدمي الخدمات و البرامج الي المشتركين
            </p>
            <h2 className="metric-value">87%</h2>
          </div>
          <div className="metric-card">
            <p className="metric-title">عدد المستفيدين</p>
            <h2 className="metric-value">500</h2>
          </div>
          <div className="metric-card">
            <p className="metric-title">
              {" "}
              نسبه المستفيدين الي اجمالي المشتركين{" "}
            </p>
            <h2 className="metric-value">87%</h2>
          </div>
        </div>
      </div>
      {/* ))} */}
    </div>
  );
};
export default ActiveTab;
