import { useInfiniteQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../lib/axios";

export default function useGetReels() {
  const {
    data: reels,
    isLoading,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["reels"],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await axiosInstance.get("reels", {
        params: {
          page: pageParam,
        },
      });
      if (res.data.code !== 200) {
        throw new Error(res.message || "Error Getting reels");
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
    reels,
    isLoading,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  };
}
