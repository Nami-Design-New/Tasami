import { useInfiniteQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";
import { useSearchParams } from "react-router";

export default function useGetMyAssistances() {
  const [searchParams] = useSearchParams();
  const is_archived = searchParams.get("tab") === "archived" ? 1 : 0;

  const {
    data: myAssistances,
    isLoading,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["my-assistances", is_archived],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await axiosInstance.get("my-help-service", {
        params: {
          page: pageParam,
          is_archived,
        },
      });

      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Something went wrong");
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
    myAssistances,
    isLoading,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  };
}
