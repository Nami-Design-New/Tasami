import { Outlet } from "react-router";
import PageHeader from "../../../ui/PageHeader";
import PerformanceFilter from "../../../ui/dash-board/reports/PerformanceFilter";
import { useSelector } from "react-redux";

const Reports = () => {
  const { metrics } = useSelector((state) => state.filter);
  return (
    <section>
      <PageHeader />
      <PerformanceFilter metrics={metrics} />
      <Outlet />
    </section>
  );
};

export default Reports;
