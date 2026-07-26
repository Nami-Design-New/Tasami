import { useInfiniteQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../lib/axios";

export default function useGetCommunityMembers(userId) {
  const {
    data: communityMembers,
    isLoading,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["community-members", userId],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await axiosInstance.get("my-community-members", {
        params: {
          page: pageParam,
          user_id: userId,
        },
      });

      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Something went wrong");
      }

      return res.data;
    },
    getNextPageParam: (lastPage) => {
      const nextPageUrl = lastPage?.next_page_url || lastPage?.data?.next_page_url;

      return nextPageUrl
        ? new URL(nextPageUrl).searchParams.get("page")
        : undefined;
    },
    enabled: !!userId,
  });

  return {
    communityMembers,
    isLoading,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  };
}
