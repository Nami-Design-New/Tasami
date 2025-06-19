import { useSelector } from "react-redux";
import { Outlet } from "react-router";
import NavigationTabs from "../../../ui/NavigationTabs";
import PageHeader from "../../../ui/PageHeader";
import PerformanceFilter from "../../../ui/dash-board/reports/PerformanceFilter";
import { REPORT_TABS } from "../../../utils/constants";

const Reports = () => {
  const { metrics } = useSelector((state) => state.filter);
  return (
    <section>
      <PageHeader />
      <div className="row ">
        <div className=" col-12 col-xl-4  p-2">
          <PerformanceFilter metrics={metrics} />
        </div>
        <div className="col-12 col-xl-8 p-2">
          <NavigationTabs tabs={REPORT_TABS} />
          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default Reports;
