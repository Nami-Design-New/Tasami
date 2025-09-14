import { useInfiniteQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../lib/axios";

export default function useGetTransactions() {
  const {
    data: transctions,
    isLoading,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["my-transactions"],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await axiosInstance.get("wallet", {
        params: {
          page: pageParam,
        },
      });
      if (res.data.code !== "") {
        throw new Error(res.data.message || "Something went wrong");
      }
      console.log(res.data);

      return res.data;
    },
    getNextPageParam: (lastPage) => {
      return lastPage?.next_page_url
        ? new URL(lastPage.next_page_url).searchParams.get("page")
        : undefined;
    },
  });
  return {
    transctions,
    isLoading,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  };
}
