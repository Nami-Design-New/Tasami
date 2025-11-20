import { useQuery } from "@tanstack/react-query";
import { adminAxiosInstance } from "../../../lib/adminAxios";

export default function useGetPerformanceIndicators(payload) {
  const { data: perfomanceIndicators, isLoading } = useQuery({
    queryKey: ["dashboard-employee-performance-indicators"],
    queryFn: async () => {
      const res = await adminAxiosInstance.post(
        "dh-performance-indicators",
        payload
      );

      if (res.data.code !== 200) {
        throw new Error(
          res.data.message || "Error fetching perfomance insicators"
        );
      }
    },
  });
  return { perfomanceIndicators, isLoading };
}
