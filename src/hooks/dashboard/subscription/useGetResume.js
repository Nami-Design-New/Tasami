import { useQuery } from "@tanstack/react-query";
import { adminAxiosInstance } from "../../../lib/adminAxios";

export default function useGetResume(
  id
) {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["user-resume", id],
    queryFn: async () => {
      const res = await adminAxiosInstance.get(`dh-resuems/${id}`,);

      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Error fetching users resume");
      }

      return res.data;
    },
    keepPreviousData: true,
  });

  return {
    userResume: data?.data || [],
    isLoading,
    isError,
    refetch,
  };
}
