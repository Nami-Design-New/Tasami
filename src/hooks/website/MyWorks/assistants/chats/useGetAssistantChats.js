import { useInfiniteQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { axiosInstance } from "../../../../../lib/axios";

export default function useGetAssistantChats() {
  const { id } = useParams();
  const {
    data: chats,
    isLoading,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["contract-chat", id],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await axiosInstance.get("contract-chat", {
        params: {
          contract_id: id,
          pagenation: "on",
          page: pageParam,
        },
      });
      if (res?.data?.code !== 200) {
        throw new Error(res.data.message || "Error Fetching Chats");
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
    chats,
    isLoading,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  };
}
