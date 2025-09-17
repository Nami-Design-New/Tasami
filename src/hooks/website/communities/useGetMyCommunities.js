import { useInfiniteQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../lib/axios";

export default function useGetMyCommunities() {
  const {
    data: myCommunities,
    isLoading,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["my-communities"],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await axiosInstance.get("my-communities", {
        params: {
          page: pageParam,
        },
      });
      if (res.data.code !== 200) {
        throw new Error(res.data.message);
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
    myCommunities,
    isLoading,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  };
}
