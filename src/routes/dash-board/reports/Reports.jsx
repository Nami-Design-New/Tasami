import { useSelector } from "react-redux";
import NavigationTabs from "../../../ui/NavigationTabs";
import PageHeader from "../../../ui/PageHeader";
import PerformanceFilter from "../../../ui/dash-board/reports/PerformanceFilter";
import { REPORT_TABS } from "../../../utils/constants";
import useGetPerformanceReport from "./../../../hooks/dashboard/perfomanceReport/useGetPerformanceReport";
import { Outlet, useLocation } from "react-router";

const Reports = () => {
  const { region, country, city, period } = useSelector(
    (state) => state.filter
  );

  const location = useLocation();
  const pathSegments = location.pathname.split("/");
  let search_type = pathSegments[pathSegments.length - 1];
  if (search_type === "reports") {
    search_type = "users";
  }

  console.log({ region, country, city, period });

  const { performanceReportData, isLoading } = useGetPerformanceReport(
    region,
    country,
    city,
    period,
    search_type
  );

  return (
    <section>
      <PageHeader />
      <div className="row ">
        <div className=" col-12 col-xl-3 p-2">
          <PerformanceFilter searchType={search_type} />
        </div>
        <div className="col-12 col-xl-9 p-2">
          <NavigationTabs tabs={REPORT_TABS} />

          <Outlet context={{ performanceReportData, isLoading, search_type }} />
        </div>
      </div>
    </section>
  );
};

export default Reports;
