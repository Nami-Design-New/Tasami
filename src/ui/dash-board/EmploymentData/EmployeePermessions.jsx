import { useSelector } from "react-redux";
import PermissionList from "./PermissionList";
import EmptySection from "../../EmptySection";
import { useTranslation } from "react-i18next";

const EmployeePermissions = () => {
  const { t } = useTranslation();
  const { user } = useSelector((state) => state.adminAuth);

  return (
    <>
      {user?.permissions.length > 0 ? (
        <PermissionList permissions={user?.permissions} />
      ) : (
        <EmptySection message={t("dashboard.noPermissions")} />
      )}
    </>
  );
};

export default EmployeePermissions;
