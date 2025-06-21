import { useState } from "react";
import { Outlet } from "react-router";
import useGetCurrentRoute from "../../../hooks/shared/useGetCurrentRoute";
import CustomLink from "../../../ui/CustomLink";
import SuspensionModel from "../../../ui/modals/SuspensionModel";
import NavigationTabs from "../../../ui/NavigationTabs";
import PageHeader from "../../../ui/PageHeader";
import { SUB_TABS } from "../../../utils/constants";

const SubscribersAndTeams = () => {
  const { currentLocation, locations } = useGetCurrentRoute();
  const [openSuspensionModel, setOpenSuspensionModel] = useState(false);
  const isEmployeeDetails = locations.includes("employee-details");
  return (
    <section>
      <div className="p-2 d-flex align-items-center justify-content-between">
        <PageHeader
          removeLast={isEmployeeDetails === true}
          name={isEmployeeDetails === true ? " تفاصيل الموظف" : null}
        />
        {currentLocation === "teams" && (
          <CustomLink type="outlined" color="secondary" to={"create-employee"}>
            {/* <Link className="button button--add" > */}
            انشاء موظف
            {/* </Link> */}
          </CustomLink>
        )}
      </div>
      {(currentLocation === "user-accounts" ||
        currentLocation === "programs" ||
        currentLocation === "services" ||
        currentLocation === "communities" ||
        currentLocation === "personal-goals" ||
        currentLocation === "resuems") && <NavigationTabs tabs={SUB_TABS} />}
      <div>
        <Outlet />
      </div>
      <SuspensionModel
        showModal={openSuspensionModel}
        setShowModal={setOpenSuspensionModel}
      />
    </section>
  );
};

export default SubscribersAndTeams;
