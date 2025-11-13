import { useInfiniteQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import { axiosInstance } from "../../../../lib/axios";
import { useEffect } from "react";

export default function useGetCommunityChats() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: chats,
    isLoading,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["community-chat", id],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await axiosInstance.get("community-chat", {
        params: {
          community_id: id,
          pagination: "on",
          page: pageParam,
        },
      });
      if (res?.data?.code !== 200) {
        if (res.data.code === 404) {
          const err = new Error("Not Found");
          err.status = 404;
          throw err;
        } else {
          throw new Error(res.data.message || "Error Fetching Chats");
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

  // Redirect if 404 error
  useEffect(() => {
    if (error && error.status === 404) {
      navigate(-1, { replace: true });
    }
  }, [error, navigate]);
  return {
    chats,
    isLoading,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  };
}
