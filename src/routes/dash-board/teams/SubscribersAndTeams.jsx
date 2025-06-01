import { Link, Outlet } from "react-router";
import useGetCurrentRoute from "../../../hooks/shared/useGEtCurrentRoute";
import NavigationTabs from "../../../ui/NavigationTabs";
import PageHeader from "../../../ui/PageHeader";
import { SUB_TABS } from "../../../utils/constants";

const SubscribersAndTeams = () => {
  const currentLocation = useGetCurrentRoute();

  return (
    <section>
      <div className="d-flex align-items-center justify-content-between">
        <PageHeader />
        {currentLocation === "create-employer" ? (
          <button className="button button--add"> تنشيط الحساب </button>
        ) : (
          <Link className="button button--add" to={"create-employer"}>
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
