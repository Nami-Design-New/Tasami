import { useInfiniteQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../lib/axios";

export default function useGetMyContracts(status) {
  const {
    data: myContracts,
    isLoading,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["my-contracts", status],
    queryFn: async ({ pageParam }) => {
      const res = await axiosInstance.get("my-contracts", {
        params: {
          status,
          page: pageParam,
        },
      });
      if (res.data.code !== 200) {
        throw new Error(res.data.code || "Error Fetching Data");
      }
      return res.data;
    },
    getNextPageParam: (lastPage) => {
      lastPage?.next_page_url
        ? new URL(lastPage.next_page_url).searchParams.get("page")
        : undefined;
    },
  });
  return {
    myContracts,
    isLoading,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  };
}
