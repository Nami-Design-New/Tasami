import { useInfiniteQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";

export default function useGetMembers() {
  const {
    data: myMembers,
    isLoading,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["my-members"],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await axiosInstance.get("community-members", {
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
    myMembers,
    isLoading,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  };
}
