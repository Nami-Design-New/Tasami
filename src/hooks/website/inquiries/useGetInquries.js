import { useInfiniteQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../lib/axios";

export default function useGetInquries() {
  const {
    data: inquries,
    isLoading,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["inquries"],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await axiosInstance.get("inquires", {
        params: {
          pagination: "on",
          page: pageParam,
        },
      });
      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Failed to fetch Inquries");
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
    inquries,
    isLoading,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    refetch,
  };
}
