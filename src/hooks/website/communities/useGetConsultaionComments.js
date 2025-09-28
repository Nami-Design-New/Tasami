import { useInfiniteQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { axiosInstance } from "../../../lib/axios";

export default function useGetConsultaionComments() {
  const { id } = useParams();
  const {
    data: consultaionComments,
    isLoading: commentsLoading,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["comments", id],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await axiosInstance.get("consultation-comments", {
        params: { consultation_id: id, page: pageParam },
      });
      if (res.data.code !== 200) {
        throw new Error("Failed to fetch consultaion comments");
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
    consultaionComments,
    commentsLoading,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  };
}
