import { useInfiniteQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../lib/axios";

export default function useGetMyFollowings() {
  const {
    data: followings,
    isLoading,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["my-following"],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await axiosInstance.get("/my-following", {
        params: {
          page: pageParam,
        },
      });

      if (res.data.code !== 200) {
        throw new Error(res.data.message || "error fetching data");
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
    followings,
    isLoading,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  };
}
