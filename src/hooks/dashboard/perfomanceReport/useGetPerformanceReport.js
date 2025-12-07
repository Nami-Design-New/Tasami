import { useQuery } from "@tanstack/react-query";
import { adminAxiosInstance } from "../../../lib/adminAxios";

export default function useGetPerformanceReport(search_type, region_id, country_id, city_id, period, start_date, end_date) {
  const {
    data: performanceReportData,
    isLoading,
  } = useQuery({
    queryKey: ["performance-report-kpi", search_type, region_id, country_id, city_id, period, start_date, end_date],
    queryFn: async () => {
      const res = await adminAxiosInstance.get("kpi", {
        params: { search_type, region_id, country_id, city_id, period, start_date, end_date },
      });

      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Error create Data");
      }

      return res.data?.data;
    },
    keepPreviousData: true,
  });

  return {
    performanceReportData,
    isLoading,

  };
}
