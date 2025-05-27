import { Link, Outlet, useLocation } from "react-router";
import NavigationTabs from "../../../ui/NavigationTabs";
import { SUB_TABS } from "../../../utils/constants";
import PageHeader from "../../../ui/PageHeader";

const SubscribersAndTeams = () => {
  const location = useLocation();
  const currentLocation = location.pathname.split("/")[3];

  return (
    <section>
      <div className="d-flex align-items-center justify-content-between">
        <PageHeader />
        <Link className="button button--add" to={"create-employer"}>
          {" "}
          انشاء موظف{" "}
        </Link>
      </div>
      {currentLocation === "teams" ? null : <NavigationTabs tabs={SUB_TABS} />}
      <div>
        <Outlet />
      </div>
    </section>
  );
};

export default SubscribersAndTeams;
