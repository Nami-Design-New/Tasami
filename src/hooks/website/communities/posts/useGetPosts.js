import { useInfiniteQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { axiosInstance } from "../../../../lib/axios";

export default function useGetPosts() {
  const { id } = useParams();
  const {
    data: posts,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["community-posts", id],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await axiosInstance.get("posts", {
        params: {
          page: pageParam,
          communty_id: id,
        },
      });

      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Error Fetching Posts");
      }

      return res.data;
    },
    getNextPageParam: (lastPage) => {
      return lastPage?.next_page_url
        ? new URL(lastPage.next_page_url).searchParams.get("page")
        : undefined;
    },
  });
  return { posts, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage };
}
