import { useInfiniteQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../lib/axios";
import { getNextPageParam } from "../../../utils/pagination";

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
    queryFn: async ({ pageParam = 1 }) => {
      const res = await axiosInstance.get("my-works", {
        skipNotFoundRedirect: true,
        params: {
          status,
          page: pageParam,
        },
      });
      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Error Fething my works");
      }

      return res.data;
    },
    getNextPageParam,
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
