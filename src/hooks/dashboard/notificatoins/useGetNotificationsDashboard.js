import { useQuery } from "@tanstack/react-query";
import { adminAxiosInstance } from "../../../lib/adminAxios";
import { useEffect } from "react";

export default function useGetNotificationsDashboard(
  search = "",
  page = 1,
  pageSize = 10,
  sortConfig = null,
  filters = null,
) {
  useEffect(() => {
    console.log("🔴 QUERY FILTERS:", filters);
  }, [filters]);
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: [
      "dashboard-notifications",
      search,
      page,
      pageSize,
      sortConfig?.sortBy,
      sortConfig?.sortOrder,
      filters,
    ],
    queryFn: async () => {
      const res = await adminAxiosInstance.get("dh-tasks-notifications", {
        params: {
          search,
          page,
          limit_per_page: pageSize,
          sortBy: sortConfig?.sortBy,
          sortOrder: sortConfig?.sortOrder,
          ...filters,
        },
      });

      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Error fetching notifications");
      }

      return res.data;
    },
    keepPreviousData: true,
  });

  return {
    notifications: data?.data || [],
    // stats: data
    //   ? {
    //       group_count: data.group_count,
    //       executive_count: data.executive_count,
    //       leader_count: data.leader_count,
    //       manager_count: data.manager_count,
    //       supervisor_count: data.supervisor_count,
    //       customer_service_count: data.customer_service_count,
    //     }
    //   : {},
    currentPage: data?.current_page || 1,
    lastPage: data?.last_page || 1,
    isLoading,
    isError,
    refetch,
  };
}
