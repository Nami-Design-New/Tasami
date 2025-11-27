import { useInfiniteQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { adminAxiosInstance } from "../../../lib/adminAxios";

export default function useGetPostDashComments() {
  const { id } = useParams();
  const {
    data: postDashComments,
    isLoading: commentsLoading,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["dh-post-comments", id],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await adminAxiosInstance.get("dh-post-comments", {
        params: { post_id: id, page: pageParam },
      });
      if (res.data.code !== 200) {
        throw new Error("Failed to fetch post dashboard comments");
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
    postDashComments,
    commentsLoading,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  };
}
