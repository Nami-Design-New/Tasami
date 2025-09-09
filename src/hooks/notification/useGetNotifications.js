import { useInfiniteQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";

export default function useGetNotifications({ searchWord = "" }) {
  const {
    data: notifications,
    isLoading,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["notifications", searchWord],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await axiosInstance.get("notifications", {
        params: {
          pagination: "on",
          page: pageParam,
          search_word: searchWord,
        },
      });

      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Failed to fetch notifications");
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
    notifications,
    isLoading,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  };
}
