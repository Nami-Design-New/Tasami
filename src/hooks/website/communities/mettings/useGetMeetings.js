import { useInfiniteQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../../lib/axios";
import { useParams } from "react-router";

export default function useGetMeetings() {
  const { id } = useParams();
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
      console.log(res.data);

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
