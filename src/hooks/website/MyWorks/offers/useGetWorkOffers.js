import { useInfiniteQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../../lib/axios";

export default function useGetWorkOffers(id) {
  const {
    data: workOffers,
    isLoading,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["work-offers", id],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await axiosInstance.get("goal-offer", {
        params: { work_id: id, page: pageParam },
      });
      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Failed to fetch work offers");
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
    workOffers,
    isLoading,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  };
}
