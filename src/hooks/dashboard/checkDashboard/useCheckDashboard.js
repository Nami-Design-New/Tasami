import { useLocation } from "react-router";

export default function useCheckDashboard() {
  const location = useLocation();
  return location.pathname.includes("dashboard");
}
