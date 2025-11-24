import { Navigate } from "react-router";

export function SkipGuardedRoute({ children }) {
  const skipped = localStorage.getItem("skipAreasOfInterest");

  if (skipped === "true") {
    return <Navigate to="/" replace />;
  }

  return children;
}
