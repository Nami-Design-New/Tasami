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
      <h2 className=" performance-report__header ">
        نتائج التقرير - {t(`pageHeaders.${routeKey}`)}
      </h2>
      <ul>
        {filteredData.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};
export default ActiveTab;
