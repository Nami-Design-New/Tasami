import { useMemo } from "react";
import { useSelector } from "react-redux";
import {
  flattenGrantedPermissions,
  normalizePermissionRequirement,
} from "../../../utils/dashboardPermissions";

export default function useAdminPermissions() {
  const user = useSelector((state) => state.adminAuth.user);

  const grantedPermissions = useMemo(
    () => flattenGrantedPermissions(user?.permissions),
    [user?.permissions],
  );

  const grantedPermissionSet = useMemo(
    () => new Set(grantedPermissions),
    [grantedPermissions],
  );

  const checkPermission = (permission) => {
    if (!permission) return true;
    return grantedPermissionSet.has(permission);
  };

  const checkAnyPermission = (permissions) => {
    const requiredPermissions = normalizePermissionRequirement(permissions);
    if (requiredPermissions.length === 0) return true;

    return requiredPermissions.some((permission) =>
      grantedPermissionSet.has(permission),
    );
  };

  return {
    grantedPermissions,
    hasPermission: checkPermission,
    hasAnyPermission: checkAnyPermission,
    permissionsReady: Boolean(user),
  };
}

