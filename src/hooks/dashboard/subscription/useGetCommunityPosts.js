import { useInfiniteQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { adminAxiosInstance } from "../../../lib/adminAxios";
import { PAGE_SIZE } from "../../../utils/constants";

export default function useGetCommunityPosts() {
  const { id } = useParams();
  const {
    data: communityPostTest,
    isLoading: postsLoading,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["dh-community-posts", id],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await adminAxiosInstance.get("dh-community-posts", {
        params: {
          community_id: id,
          page: pageParam,
          limit_per_page: PAGE_SIZE,
        },
      });
      if (res.data.code !== 200) {
        throw new Error("Failed to fetch posts dashboard comments");
      }
      return res.data;
    },
    getNextPageParam: (lastPage) => {
      return lastPage?.next_page_url
        ? new URL(lastPage.next_page_url).searchParams.get("page")
        : undefined;
    },
  });
  return {
    communityPostTest,
    postsLoading,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  };
}
