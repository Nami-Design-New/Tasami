import { Navigate, useLocation } from "react-router";
import useAdminPermissions from "../hooks/auth/dashboard/useAdminPermissions";
import Loading from "../ui/loading/Loading";

export default function RequireAdminPermission({ children, permission }) {
  const { hasAnyPermission, permissionsReady } = useAdminPermissions();
  const location = useLocation();

  if (!permissionsReady) {
    return <Loading />;
  }

  if (!hasAnyPermission(permission)) {
    return (
      <Navigate to="/forbidden" replace state={{ from: location }} />
    );
  }

  return children;
}

