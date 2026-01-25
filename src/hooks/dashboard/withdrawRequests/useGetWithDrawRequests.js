import { useQuery } from "@tanstack/react-query";
import { adminAxiosInstance } from "../../../lib/adminAxios";

export default function useGetWithDrawRequests(
  search,
  page = 1,
  pageSize = 10,
  sortConfig = null,
  filters = null,
) {
  const { data: withdrawRequests, isLoading } = useQuery({
    queryKey: [
      "withdraw-requests",
      page,
      pageSize,
      search,
      sortConfig?.sortBy,
      sortConfig?.sortOrder,
      filters,
    ],
    queryFn: async () => {
      const res = await adminAxiosInstance.get("dh-withdraw-requests", {
        params: {
          page,
          limit_per_page: pageSize,
          search,
          status: filters?.status,
          from_date: filters?.created_at?.from,
          to_date: filters?.created_at?.to,
        },
      });
      if (res.data.code !== 200) {
        throw new Error(res.data.message, "Error Fetching witdraw Data");
      }

      return res.data;
    },
    keepPreviousData: true,
    gcTime: undefined,
    staleTime: undefined,
  });
  return {
    withdrawRequests,
    isLoading,
    currentPage: withdrawRequests?.current_page || 1,
    lastPage: withdrawRequests?.last_page || 1,
  };
}
