import { useInfiniteQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../lib/axios";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router";

export default function useGetNotifications() {
  const [searchParams] = useSearchParams();
  const searchWord = searchParams.get("search") || "";
  const { user } = useSelector((state) => state.authRole);

  const {
    data: notifications,
    isLoading,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["notifications", searchWord],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await axiosInstance.get("notifications", {
        params: {
          page: pageParam,
          pagination: "on",
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
    enabled: !!user,
    gcTime: 0,
    staleTime: 0,
    cacheTime: 0,
    refetchOnMount: "always",
  });
  return {
    notifications,
    isLoading,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    refetch,
  };
}
