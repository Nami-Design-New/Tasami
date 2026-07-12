import useAdminPermissions from "../../hooks/auth/dashboard/useAdminPermissions";

export default function PermissionGate({ children, permission, fallback = null }) {
  const { hasAnyPermission } = useAdminPermissions();

  return hasAnyPermission(permission) ? children : fallback;
}

