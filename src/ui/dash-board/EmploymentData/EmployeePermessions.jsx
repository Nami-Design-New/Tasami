import { useSelector } from "react-redux";
import PermissionList from "./PermissionList";
import EmptySection from "../../EmptySection";
import { useTranslation } from "react-i18next";
import { getTakenPermissionItems } from "../../../utils/dashboardPermissions";

const EmployeePermissions = () => {
  const { t } = useTranslation();
  const { user } = useSelector((state) => state.adminAuth);
  const takenPermissions = getTakenPermissionItems(user?.permissions);

  return (
    <>
      {takenPermissions.length > 0 ? (
        <PermissionList permissions={takenPermissions} />
      ) : (
        <EmptySection message={t("dashboard.noPermissions")} />
      )}
    </>
  );
};

export default EmployeePermissions;
