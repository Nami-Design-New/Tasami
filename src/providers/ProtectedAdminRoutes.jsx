import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router";
import useAdminAuth from "../hooks/auth/dashboard/useAdminAuth";
import Loading from "../ui/loading/Loading";

export default function ProtectedAdminRoutes({ children, allowedRoles }) {
  const { loading, isAuthed } = useAdminAuth();
  const role = useSelector((s) => s.adminAuth.role);
  const location = useLocation();

  if (loading) {
    return <Loading />;
  }

  if (!isAuthed) {
    return (
      <Navigate to="/dashboard/login" replace state={{ from: location }} />
    );
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}
