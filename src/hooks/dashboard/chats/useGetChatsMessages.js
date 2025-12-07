import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { adminAxiosInstance } from "../../../lib/adminAxios";

export default function useGetChatsMessages() {
  const [searchParams, setSearchParams] = useSearchParams();

  const chatId = searchParams.get("chatId");
  const navigate = useNavigate();
  const {
    data: chatMessages,
    isLoading,
    hasNextPage,
    error,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["chat-room-messages", chatId],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await adminAxiosInstance.get(`dh-chat-messages/${chatId}`);
      if (res?.data?.code !== 200) {
        if (res.data.code === 404) {
          const err = new Error("Not Found");
          err.status = 404;
          throw err;
        } else {
          throw new Error(res.data.message || "Error Fetching Chat Messages");
        }
      }
      return res.data;
    },
    getNextPageParam: (lastPage) => {
      return lastPage?.next_page_url
        ? new URL(lastPage.next_page_url).searchParams.get("page")
        : undefined;
    },
  });
  useEffect(() => {
    if (error && error.status === 404) {
      navigate(-1, { replace: true });
    }
  }, [error, navigate]);
  return {
    chatMessages,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  };
}
