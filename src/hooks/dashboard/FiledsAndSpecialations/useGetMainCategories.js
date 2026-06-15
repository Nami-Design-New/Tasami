import { useQuery } from "@tanstack/react-query";
import { adminAxiosInstance } from "../../../lib/adminAxios";

export default function useGetMainCategories(
  search = "",
  page = 1,
  pageSize = 10,
  pagination = "on",
) {
  const isPaginationOff = pagination === "off";

  const { data: mainCategories, isLoading } = useQuery({
    queryKey: isPaginationOff
      ? ["dashboard-main-categories", "all", search]
      : ["dashboard-main-categories", search, page, pageSize, pagination],
    queryFn: async () => {
      const res = await adminAxiosInstance.get("dh-categories", {
        params: isPaginationOff
          ? {
              search,
              pagination: "off",
            }
            : {
                search,
                page,
                limit_per_page: pageSize,
                pagination: "on",
              },
      });
      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Error Fetching Categories");
      }
      return res.data;
    },
    staleTime: isPaginationOff ? Infinity : 0,
    gcTime: isPaginationOff ? 30 * 60 * 1000 : 5 * 60 * 1000,
    refetchOnMount: isPaginationOff ? false : true,
    refetchOnWindowFocus: !isPaginationOff,
  });

  const paginatedData = mainCategories?.data;
  const paginationSource =
    mainCategories?.meta ||
    (!Array.isArray(paginatedData) ? paginatedData : null) ||
    mainCategories;

  return {
    mainCategories,
    categories: Array.isArray(paginatedData)
      ? paginatedData
      : paginatedData?.data || [],
    currentPage: paginationSource?.current_page || 1,
    lastPage: paginationSource?.last_page || 1,
    isLoading,
  };
}
