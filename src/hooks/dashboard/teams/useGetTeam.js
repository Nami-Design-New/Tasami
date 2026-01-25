import { useQuery } from "@tanstack/react-query";
import { adminAxiosInstance } from "../../../lib/adminAxios";

export default function useGetTeam(
  search = "",
  page = 1,
  pageSize = 10,
  sortConfig = null,
  filters = null,
) {
  const {
    data: team,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: [
      "dashboard-team",
      search,
      page,
      sortConfig?.sortBy,
      sortConfig?.sortOrder,
      filters,
    ],
    queryFn: async () => {
      const res = await adminAxiosInstance.get("dh-employees", {
        params: {
          search,
          page,
          limit_per_page: pageSize,
          sortBy: sortConfig?.sortBy,
          sortOrder: sortConfig?.sortOrder,
          region_id: filters?.region_id,
          country_id: filters?.country_id,
          city_id: filters?.city_id,
          role_id: filters?.role_id,
          status: filters?.status,
          nationality_id: filters?.nationality,
        },
      });

      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Error create Data");
      }

      return res.data;
    },
    keepPreviousData: true,
    staleTime: 30 * 1000,
    gcTime: 5 * 60 * 1000,
  });

  return {
    team,
    isLoading,
    currentPage: team?.current_page || 1,
    lastPage: team?.last_page || 1,
    isError,
    refetch,
  };
}
