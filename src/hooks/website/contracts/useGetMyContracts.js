import { useInfiniteQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../lib/axios";
import { getNextPageParam } from "../../../utils/pagination";

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
    queryFn: async ({ pageParam = 1 }) => {
      const res = await axiosInstance.get("my-contracts", {
        skipNotFoundRedirect: true,
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
    getNextPageParam,
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
