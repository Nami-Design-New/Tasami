import { useInfiniteQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../lib/axios";

export default function useGetFAQs() {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["faqs"],
      queryFn: async ({ pageParam = 1 }) => {
        const { data } = await axiosInstance.get(
          `/faqs?pagination=on&page=${pageParam}`,
        );
        return data;
      },
      getNextPageParam: (lastPage) => {
        return lastPage?.next_page_url
          ? new URL(lastPage.next_page_url).searchParams.get("page")
          : undefined;
      },
    });

  return {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
}
