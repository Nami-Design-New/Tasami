import { useInfiniteQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../lib/axios";

export default function useGetRates(id) {
  const {
    data: rates,
    isLoading,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["work-rates", id],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await axiosInstance.get("help-services-rates", {
        params: { page: pageParam, work_id: id },
      });
      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Error Fetching Rates");
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
    rates,
    isLoading,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  };
}
