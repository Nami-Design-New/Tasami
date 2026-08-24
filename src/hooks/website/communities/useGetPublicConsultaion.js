import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import { axiosInstance } from "../../../lib/axios";
import { refreshCommunityIndicatorQueries } from "../../../utils/communityIndicatorQueries";

export default function useGetPublicConsultations() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const searchWord = searchParams.get("search") || "";
  const {
    data: publicConsultaions,
    isLoading,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["public-consultaions", searchWord],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await axiosInstance.get("consultations", {
        params: {
          page: pageParam,
          type: "public",
          ...(searchWord ? { search: searchWord } : {}),
        },
      });

      if (res.data.code !== 200) {
        throw new Error(res.data.message);
      }
      if (pageParam === 1) {
        refreshCommunityIndicatorQueries(queryClient);
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
    publicConsultaions,
    isLoading,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  };
}
