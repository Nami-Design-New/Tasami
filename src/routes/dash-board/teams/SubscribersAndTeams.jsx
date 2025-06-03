import { Link, Outlet } from "react-router";
import useGetCurrentRoute from "../../../hooks/shared/useGEtCurrentRoute";
import NavigationTabs from "../../../ui/NavigationTabs";
import PageHeader from "../../../ui/PageHeader";
import { SUB_TABS } from "../../../utils/constants";

const SubscribersAndTeams = () => {
  const { currentLocation, locations } = useGetCurrentRoute();

  console.log(currentLocation, locations);
  const isEmployeeDetails = locations.includes("employee-details");
  return (
    <section>
      <div className="d-flex align-items-center justify-content-between">
        <PageHeader
          removeLast={isEmployeeDetails === true}
          name={isEmployeeDetails === true ? " تفاصيل الموظف" : null}
        />
        {currentLocation === "create-employee" ? (
          <button className="button button--add"> تنشيط الحساب </button>
        ) : isEmployeeDetails ? (
          <button className="button button--add"> ايقاف الحساب </button>
        ) : (
          <Link className="button button--add" to={"create-employee"}>
            انشاء موظف
          </Link>
        )}
      </div>
      {(currentLocation === "user-accounts" ||
        currentLocation === "programs" ||
        currentLocation === "services" ||
        currentLocation === "resuems") && <NavigationTabs tabs={SUB_TABS} />}
      <div>
        <Outlet />
      </div>
    </section>
  );
};

export default SubscribersAndTeams;
