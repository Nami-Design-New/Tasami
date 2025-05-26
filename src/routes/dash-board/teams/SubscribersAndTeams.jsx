import { Outlet } from "react-router";
import NavigationTabs from "../../../ui/NavigationTabs";
import { SUB_TABS } from "../../../utils/constants";
import PageHeader from "../../../ui/PageHeader";

const SubscribersAndTeams = () => {
  return (
    <section>
      <PageHeader />
      <NavigationTabs tabs={SUB_TABS} />
      <div>
        <Outlet />
      </div>
    </section>
  );
};

export default SubscribersAndTeams;
