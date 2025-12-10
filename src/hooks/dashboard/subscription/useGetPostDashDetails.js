
import { useQuery } from "@tanstack/react-query";
import { adminAxiosInstance } from "../../../lib/adminAxios";

export default function useGetPostDashDetails(
  id
) {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["post-dash-details", id],
    queryFn: async () => {
      const res = await adminAxiosInstance.get(`dh-community-posts/${id}`,);

      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Error fetching community post details");
      }

      return res.data;
    },
    keepPreviousData: true,
  });

  return {
    postDashDetails: data?.data || [],
    isLoading,
    isError,
    refetch,
  };
}
