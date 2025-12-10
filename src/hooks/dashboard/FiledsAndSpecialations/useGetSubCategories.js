import { useQuery } from "@tanstack/react-query";
import { adminAxiosInstance } from "../../../lib/adminAxios";

export default function useGetSubCategories(search, page, pageSize) {
  const { data, isLoading, refetch, isError } = useQuery({
    queryKey: ["dashboard-sub-categories", search, page, pageSize],
    queryFn: async () => {
      const res = await adminAxiosInstance.get("dh-subcategories", {
        params: { search, page, limit_per_page: pageSize },
      });
      if (res.data.code !== 200) {
        throw new Error(res?.message || "Error Fetching Sub Categories");
      }
      return res.data;
    },
  });
  return {
    categories_count: data?.categories_count || 0,
    subcategories_count: data?.sub_categories_count || 0,
    subCategories: data?.data || [],
    currentPage: data?.current_page || 1,
    lastPage: data?.last_page || 1,
    isLoading,
    refetch,
    isError,
  };
}
