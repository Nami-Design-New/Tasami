import { useQuery } from "@tanstack/react-query";
import { adminAxiosInstance } from "../../../lib/adminAxios";

export default function useGetShowTask(
  search = "",
  page = 1,
  pageSize = 10,
  id
) {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["show-task", search, page, pageSize],
    queryFn: async () => {
      const res = await adminAxiosInstance.get(`dh-tasks/${id}`);

      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Error fetching show task");
      }

      return res.data;
    },
    keepPreviousData: true,
  });

  return {
    taskData: data || [],
    isLoading,
    isError,
    refetch,
  };
}
