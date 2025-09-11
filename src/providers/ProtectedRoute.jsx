import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/auth/useAuth";
import Loading from "../ui/loading/Loading";

export default function ProtectedRoute({ children, allowedRoles }) {
  const { loading, isAuthed } = useAuth();
  const role = useSelector((s) => s.authRole.role);
  const location = useLocation();

  console.log("iam in protected route");

  if (loading) {
    return <Loading />;
  }

  if (!isAuthed) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}
