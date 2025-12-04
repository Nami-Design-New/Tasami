import { useQuery } from "@tanstack/react-query";
import { adminAxiosInstance } from "../../../lib/adminAxios";

export default function useGetPerformanceReport(region_id, country_id, city_id, period, search_type) {
  const {
    data: performanceReportData,
    isLoading,
  } = useQuery({
    queryKey: ["performance-report-kpi", region_id, country_id, city_id, period, search_type],
    queryFn: async () => {
      const res = await adminAxiosInstance.get("kpi", {
        params: { region_id, country_id, city_id, period, search_type },
      });

      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Error create Data");
      }

      return res.data;
    },
    keepPreviousData: true,
  });

  return {
    performanceReportData,
    isLoading,

  };
}
