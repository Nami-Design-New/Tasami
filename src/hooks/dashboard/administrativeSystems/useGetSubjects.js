import { useQuery } from "@tanstack/react-query";
import { adminAxiosInstance } from "../../../lib/adminAxios";

export default function useGetSubjects(search = "", page = 1, pageSize = 10) {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["subjects", search, pageSize, page],
    queryFn: async () => {
      const res = await adminAxiosInstance.get("dh-task-systems", {
        params: { search, page, limit_per_page: pageSize },
      });
      if (res.data.code !== 200) {
        throw new Error("Failed to fetch subjects");
      }
      return res.data;
    },
  });
  return {
    subjects: data?.data || [],
    isLoading,
    currentPage: data?.current_page || 1,
    lastPage: data?.last_page || 1,
    isError,
    refetch,
  };
}
