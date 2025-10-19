import { useInfiniteQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../lib/axios";

export default function useGetMyWorks(status) {
  const {
    data: myWorks,
    isLoading,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["my-works", status],
    queryFn: async ({ pageParam }) => {
      const res = await axiosInstance.get("my-works", {
        params: {
          status,
          page: pageParam,
        },
      });
      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Error Fething my works");
      }
      console.log(res.data);

      return res.data;
    },
    getNextPageParam: (lastPage) => {
      lastPage?.next_page_url
        ? new URL(lastPage.next_page_url).searchParams.get("page")
        : undefined;
    },
  });
  return {
    myWorks,
    isLoading,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  };
}
