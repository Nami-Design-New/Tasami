import { useInfiniteQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";

export default function useGetFollowers() {
  const {
    data: myFollowers,
    isLoading,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["my-followers"],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await axiosInstance.get("my-followers", {
        params: {
          page: pageParam,
        },
      });

      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Something went wrong");
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
    myFollowers,
    isLoading,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  };
}
