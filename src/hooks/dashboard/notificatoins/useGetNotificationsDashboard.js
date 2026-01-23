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
          from_date: filters?.date?.from,
          to_date: filters?.date?.to,
          region_id: filters?.region_id,
          country_id: filters?.country_id,
          city_id: filters?.city_id,
          system_type: filters?.system_type,
          system_type_id: filters?.system_type_id,
          package_id: filters?.package_id,
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
    currentPage: data?.current_page || 1,
    lastPage: data?.last_page || 1,
    isLoading,
    isError,
    refetch,
  };
}
