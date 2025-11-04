import { useInfiniteQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../lib/axios";

export default function useGetClients() {
  const {
    data: myClients,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ["clients"],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await axiosInstance.get("clients-of-helper", {
        params: { page: pageParam },
      });
      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Failed to fetch clients");
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
    myClients,
    isLoading,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  };
}
