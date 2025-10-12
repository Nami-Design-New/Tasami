import React from "react";
import useGetWorkDetails from "../../../hooks/website/MyWorks/useGetWorkDetails";
import Loading from "../../../ui/loading/Loading";

export default function WorksDetails() {
  const { workDetails, isLoading } = useGetWorkDetails();
  if (isLoading) return <Loading />;
  return <div>Details</div>;
}
