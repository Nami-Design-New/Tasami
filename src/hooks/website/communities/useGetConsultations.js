import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router";
import { axiosInstance } from "../../../lib/axios";
import { refreshCommunityIndicatorQueries } from "../../../utils/communityIndicatorQueries";

export default function useGetConsultations(userId, { enabled = true } = {}) {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const searchWord = searchParams.get("search") || "";
  const {
    data: consultaions,
    isLoading,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["consultaions", id, userId, searchWord],
    enabled,
    queryFn: async ({ pageParam = 1 }) => {
      const res = await axiosInstance.get("consultations", {
        params: {
          community_id: id,
          page: pageParam,
          ...(userId ? { user_id: userId } : {}),
          ...(searchWord ? { search: searchWord } : {}),
        },
      });

      if (res.data.code !== 200) {
        throw new Error(res.data.message);
      }
      if (pageParam === 1) {
        refreshCommunityIndicatorQueries(queryClient, id);
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
    consultaions,
    isLoading,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  };
}
