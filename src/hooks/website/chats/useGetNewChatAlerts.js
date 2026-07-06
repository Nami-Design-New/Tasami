import { useInfiniteQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../lib/axios";
import { getToken } from "../../../utils/token";

export default function useGetNewChatAlerts() {
  const token = getToken();
  const {
    data,
    isLoading,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    error,
  } = useInfiniteQuery({
    queryKey: ["quick-chat-alerts"],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await axiosInstance.get("my-conversations", {
        params: {
          page: pageParam,
        },
      });

      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Error fetching conversations");
      }

      return res.data;
    },
    getNextPageParam: (lastPage) => {
      return lastPage?.next_page_url
        ? new URL(lastPage.next_page_url).searchParams.get("page")
        : undefined;
    },
    enabled: !!token,
  });

  return {
    newChatAlerts: data?.pages?.flatMap((page) => page?.data) ?? [],
    isLoading,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    error,
  };
}
