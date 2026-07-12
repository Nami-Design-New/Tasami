import { Outlet } from "react-router";
import { useTranslation } from "react-i18next";
import useGetCurrentRoute from "../../../hooks/shared/useGetCurrentRoute";
import CustomLink from "../../../ui/CustomLink";
import NavigationTabs from "../../../ui/NavigationTabs";
import PageHeader from "../../../ui/PageHeader";
import { SUB_TABS } from "../../../utils/constants";
import useAdminPermissions from "../../../hooks/auth/dashboard/useAdminPermissions";
import {
  DASHBOARD_PERMISSIONS,
  EMPLOYEE_CREATE_PERMISSIONS,
} from "../../../utils/dashboardPermissions";

const SUB_TABS_PERMISSIONS = {
  "user-accounts": DASHBOARD_PERMISSIONS.USERS,
  "personal-goals": DASHBOARD_PERMISSIONS.GOALS,
  services: DASHBOARD_PERMISSIONS.HELP_REQUESTS,
  programs: DASHBOARD_PERMISSIONS.PROGRAMS,
  communities: DASHBOARD_PERMISSIONS.COMMUNITIES,
  resuems: DASHBOARD_PERMISSIONS.RESUMES,
};

const SubscribersAndTeams = () => {
  const { t } = useTranslation();
  const { currentLocation, locations } = useGetCurrentRoute();
  const { hasAnyPermission } = useAdminPermissions();
  const canCreateEmployee = hasAnyPermission(EMPLOYEE_CREATE_PERMISSIONS);
  const visibleSubTabs = SUB_TABS.filter((tab) =>
    hasAnyPermission(SUB_TABS_PERMISSIONS[tab.to]),
  );

  const isEmployeeDetails = locations.includes("employee-details");

  return (
    <section>
      <div className="p-2 d-flex align-items-center justify-content-between">
        <PageHeader
          removeLast={isEmployeeDetails === true}
          name={
            isEmployeeDetails === true
              ? t("dashboard.subscribersTeams.employeeDetails")
              : null
          }
        />

        {currentLocation === "teams" && canCreateEmployee && (
          <CustomLink type="outlined" color="secondary" to={"create-employee"}>
            {t("dashboard.subscribersTeams.createEmployee")}
          </CustomLink>
        )}
      </div>

      {(currentLocation === "user-accounts" ||
        currentLocation === "programs" ||
        currentLocation === "services" ||
        currentLocation === "communities" ||
        currentLocation === "personal-goals" ||
        currentLocation === "resuems") && (
        <NavigationTabs tabs={visibleSubTabs} />
      )}

      <div>
        <Outlet />
      </div>
    </section>
  );
};

export default SubscribersAndTeams;
