import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { adminAxiosInstance } from "../../../lib/adminAxios";

export default function useGetEmployeeSummary() {
  const { id } = useParams();

  const { data: employeeSummary, isError, isLoading } = useQuery({
    queryKey: ["dashboard-employee-summary", id],
    queryFn: async () => {
      const res = await adminAxiosInstance.get(`dh-employees/${id}/summary`);

      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Error Fetching Employee Summary");
      }

      return res.data;
    },
    enabled: !!id,
  });

  return {
    employeeSummary,
    isError,
    isLoading,
  };
}
