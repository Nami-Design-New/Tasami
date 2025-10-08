import { useInfiniteQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../lib/axios";

export default function useGetMyGroups({ pagenation = "on" }) {
  const {
    data: myGroups,
    isLoading,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["my-groups"],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await axiosInstance.get("helper-groups", {
        params: {
          page: pageParam,
          pagenation,
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
    myGroups,
    isLoading,
    total: myGroups?.pages?.[0]?.total || 0,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  };
}
