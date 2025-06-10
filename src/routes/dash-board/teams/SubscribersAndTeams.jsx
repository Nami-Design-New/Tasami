import { Link, Outlet } from "react-router";
import useGetCurrentRoute from "../../../hooks/shared/useGetCurrentRoute";
import NavigationTabs from "../../../ui/NavigationTabs";
import PageHeader from "../../../ui/PageHeader";
import { SUB_TABS } from "../../../utils/constants";
import { useState } from "react";
import SuspensionModel from "../../../ui/modals/SuspensionModel";

const SubscribersAndTeams = () => {
  const { currentLocation, locations } = useGetCurrentRoute();
  const [openSuspensionModel, setOpenSuspensionModel] = useState(false);
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
          <button
            onClick={() => setOpenSuspensionModel(true)}
            className="button button--add"
          >
            {" "}
            ايقاف الحساب{" "}
          </button>
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
      <SuspensionModel
        showModal={openSuspensionModel}
        setShowModal={setOpenSuspensionModel}
      />
    </section>
  );
};

export default SubscribersAndTeams;
