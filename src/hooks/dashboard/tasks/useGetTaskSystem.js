import { useQuery } from "@tanstack/react-query";
import { adminAxiosInstance } from "../../../lib/adminAxios";

export default function useGetTaskSystem(
  search = "",
  page = 1,
  pageSize = 10,
  type = null,
) {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["show-task", search, page, pageSize, type],
    queryFn: async () => {
      const res = await adminAxiosInstance.get(`dh-task-systems`, {
        params: { search, page, limit_per_page: pageSize, type },
      });

      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Error fetching show task system");
      }

      return res.data;
    },
    keepPreviousData: true,
  });

  return {
    taskSystem: data || [],
    currentPage: data?.current_page || 1,
    lastPage: data?.last_page || 1,
    isLoading,
    isError,
    refetch,
  };
}
