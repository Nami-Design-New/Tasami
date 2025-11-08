import { useInfiniteQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { axiosInstance } from "../../../../lib/axios";

export default function useGetPostComments() {
  const { id } = useParams();
  const {
    data: postComments,
    isLoading,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["post-comments", id],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await axiosInstance.get("post-comments", {
        params: { post_id: id, page: pageParam },
      });
      if (res.data.code !== 200) {
        throw new Error("Failed to fetch Post comments");
      }
      return res.data;
    },
    getNextPageParam: (lastPage) => {
      return lastPage?.next_page_url
        ? new URL(lastPage.next_page_url).searchParams.get("page")
        : undefined;
    },
    // gcTime: 3 * 60 * 1000,
  });
  return {
    postComments,
    isLoading,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  };
}
