import { Navigate } from "react-router";

export function SkipGuardedRoute({ children }) {
  const skipped = localStorage.getItem("skipAreasOfInterest");
  console.log("AreasOfInterest-----------------------------");
  console.log("skip-----------------------------", skipped);

  if (skipped === "true") {
    console.log("here");

    return <Navigate to="/" replace />;
  }

  return children;
}
