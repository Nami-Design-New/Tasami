import { useQuery } from "@tanstack/react-query";
import { adminAxiosInstance } from "../../../lib/adminAxios";

export default function useGetCommunityPosts(
  page = 1,
  pageSize = 10,
  id
) {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["dh-community-posts", id, page, pageSize],
    queryFn: async () => {
      const res = await adminAxiosInstance.get(`dh-community-posts`, {
        params: {
          page,
          limit_per_page: pageSize,
          community_id: id
        },
      }
      );

      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Error fetching users  posts communities");
      }

      return res.data;
    },
    keepPreviousData: true,
  });

  return {
    communityPosts: data?.data || [],
    currentPage: data?.current_page || 1,
    lastPage: data?.last_page || 1,
    isLoading,
    isError,
    refetch,
  };
}
