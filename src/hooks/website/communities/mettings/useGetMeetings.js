import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../../../lib/axios";
import { useParams } from "react-router";
import { refreshCommunityIndicatorQueries } from "../../../../utils/communityIndicatorQueries";

export default function useGetMeetings() {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const {
    data,
    isLoading,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["meetings", id],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await axiosInstance.get("meeting", {
        params: {
          page: pageParam,
          community_id: id,
        },
      });

      if (res.data.code !== 200) {
        throw new Error("Error fetching meetings");
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
    data,
    isLoading,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  };
}
