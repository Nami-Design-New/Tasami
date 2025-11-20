import { useQuery } from "@tanstack/react-query";
import { adminAxiosInstance } from "../../../lib/adminAxios";
import { useSearchParams } from "react-router";

export default function useGetPerformanceIndicators(employeeId) {
  const [searchParams] = useSearchParams();
  const fromDate = searchParams.get("fromDate") || "";
  const toDate = searchParams.get("toDate") || "";

  const { data: perfomanceIndicators, isLoading } = useQuery({
    queryKey: [
      "dashboard-employee-performance-indicators",
      employeeId,
      fromDate,
      toDate,
    ],
    queryFn: async () => {
      const res = await adminAxiosInstance.get(
        `dh-performance-indicators/${employeeId}`,
        {
          params: {
            from_date: fromDate,
            to_date: toDate,
          },
        }
      );

      if (res.data.code !== 200) {
        throw new Error(
          res.data.message || "Error fetching perfomance insicators"
        );
      }
      return res.data;
    },
  });
  return { perfomanceIndicators, isLoading };
}
