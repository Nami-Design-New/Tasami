import { useInfiniteQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../lib/axios";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router";

export default function useGetInquries() {
  const [searchParams] = useSearchParams();
  const searchWord = searchParams.get("search") || "";
  const { user } = useSelector((state) => state.authRole);

  const {
    data: inquries,
    isLoading,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["inquries", searchWord],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await axiosInstance.get("inquires", {
        params: {
          pagination: "on",
          page: pageParam,
          ...(searchWord ? { search: searchWord } : {}),
        },
      });
      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Failed to fetch Inquries");
      }
      return res.data;
    },
    getNextPageParam: (lastPage) => {
      return lastPage?.next_page_url
        ? new URL(lastPage.next_page_url).searchParams.get("page")
        : undefined;
    },
    enabled: !!user,
    gcTime: 0,
    staleTime: 0,
    cacheTime: 0,
    refetchOnMount: "always",
  });
  return {
    inquries,
    isLoading,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    refetch,
  };
}
