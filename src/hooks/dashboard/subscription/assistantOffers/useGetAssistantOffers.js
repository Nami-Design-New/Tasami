import { useQuery } from "@tanstack/react-query";
import { adminAxiosInstance } from "../../../../lib/adminAxios";

export default function useGetAssistantOffers(
  search = "",
  page = 1,
  pageSize = 10,
  sortConfig = null,
  filters = null,
) {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: [
      "assistant-offers",
      search,
      page,
      pageSize,
      sortConfig?.sortBy,
      sortConfig?.sortOrder,
      filters,
    ],
    queryFn: async () => {
      const res = await adminAxiosInstance.get(`dh-programs`, {
        params: {
          search,
          page,
          limit_per_page: pageSize,
          sortBy: sortConfig?.sortBy,
          sortOrder: sortConfig?.sortOrder,
          is_archived: filters?.is_archived,
          from_date: filters?.created_at?.from,
          to_date: filters?.created_at?.to,
          package_id: filters?.account_type,
          category_id: filters?.category,
          sub_category_id: filters?.sub_category,
        },
      });

      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Error fetching Assistant Offers");
      }

      return res.data;
    },
    keepPreviousData: true,
  });

  return {
    assistantOffersData: data || [],
    currentPage: data?.current_page || 1,
    lastPage: data?.last_page || 1,
    isLoading,
    isError,
    refetch,
  };
}
