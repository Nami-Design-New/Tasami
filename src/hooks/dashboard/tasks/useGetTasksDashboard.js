import { useQuery } from "@tanstack/react-query";
import { adminAxiosInstance } from "../../../lib/adminAxios";

export default function useGetTasksDashboard(
  search = "",
  page = 1,
  pageSize = 10,
  sortConfig = null,
  filters = null,
) {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: [
      "dashboard-tasks",
      search,
      page,
      pageSize,
      sortConfig?.sortBy,
      sortConfig?.sortOrder,
      filters,
    ],
    queryFn: async () => {
      const res = await adminAxiosInstance.get("dh-tasks", {
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
          status: filters?.status,
          role_id: filters?.actionLevel,
        },
      });

      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Error fetching tasks");
      }

      return res.data;
    },
    keepPreviousData: true,
    gcTime: undefined,
    staleTime: undefined,
  });

  return {
    tasks: data || [],
    currentPage: data?.current_page || 1,
    lastPage: data?.last_page || 1,
    isLoading,
    isError,
    refetch,
  };
}
