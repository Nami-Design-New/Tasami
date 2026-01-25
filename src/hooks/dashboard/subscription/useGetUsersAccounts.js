import { useQuery } from "@tanstack/react-query";
import { adminAxiosInstance } from "../../../lib/adminAxios";

export default function useGetUsersAccounts(
  search = "",
  page = 1,
  pageSize = 10,
  sortConfig = null,
  filters = null,
) {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: [
      "users-accounts",
      search,
      page,
      pageSize,
      sortConfig?.sortBy,
      sortConfig?.sortOrder,
      filters,
    ],
    queryFn: async () => {
      const res = await adminAxiosInstance.get(`dh-users`, {
        params: {
          search,
          page,
          limit_per_page: pageSize,
          sortBy: sortConfig?.sortBy,
          sortOrder: sortConfig?.sortOrder,
          from_date: filters?.created_at?.from,
          to_date: filters?.created_at?.to,
          region_id: filters?.region_id_title,
          country_id: filters?.country_id_title,
          city_id: filters?.city_id_title,
          gender: filters?.gender,
          package_id: filters?.account_type,
          nationality_id: filters?.nationality_title,
        },
      });

      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Error fetching users accounts");
      }

      return res.data;
    },
    keepPreviousData: true,
  });

  return {
    usersAccounts: data || [],
    currentPage: data?.current_page || 1,
    lastPage: data?.last_page || 1,
    isLoading,
    isError,
    refetch,
  };
}
