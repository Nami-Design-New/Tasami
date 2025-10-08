import { useInfiniteQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../lib/axios";

export default function useGetMyOpportunities() {
  const {
    data: saves,
    isLoading,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["saves"],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await axiosInstance.get("my-saved-goals", {
        params: {
          page: pageParam,
        },
      });

      if (res.data.code !== 200) {
        throw new Error(res.data.message || "error fetching My Saves");
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
    saves,
    isLoading,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  };
}
