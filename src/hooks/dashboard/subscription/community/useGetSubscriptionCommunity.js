import { useQuery } from "@tanstack/react-query";
import { adminAxiosInstance } from "../../../../lib/adminAxios";

export default function useGetSubscriptionCommunity(
  search = "",
  page = 1,
  pageSize = 10,
  sortConfig = null,
  filters = null,
) {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: [
      "subscription-community",
      search,
      page,
      pageSize,
      sortConfig?.sortBy,
      sortConfig?.sortOrder,
      filters,
    ],
    queryFn: async () => {
      const res = await adminAxiosInstance.get(`dh-communities`, {
        params: {
          search,
          page,
          limit_per_page: pageSize,
          sortBy: sortConfig?.sortBy,
          sortOrder: sortConfig?.sortOrder,
          gender: filters?.gender,
          from_date: filters?.created_at?.from,
          to_date: filters?.created_at?.to,
          package_id: filters?.account_type,
          account_status: filters?.accountStatus,
          nationality_id: filters?.nationality,
          region_id: filters?.region_id,
          country_id: filters?.country_id,
          city_id: filters?.city_id,
          is_active: filters?.communityStatus,
        },
      });

      if (res.data.code !== 200) {
        throw new Error(
          res.data.message || "Error fetching subscription communities",
        );
      }

      return res.data;
    },
    keepPreviousData: true,
  });

  return {
    subscriptionCommunity: data || [],
    currentPage: data?.current_page || 1,
    lastPage: data?.last_page || 1,
    isLoading,
    isError,
    refetch,
  };
}
