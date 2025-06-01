import { useLocation } from "react-router";

const useGetCurrentRoute = () => {
  const location = useLocation();
  const locations = location.pathname.split("/");
  const currentLocation = locations[locations.length - 1];
  return currentLocation;
};

export default useGetCurrentRoute;
