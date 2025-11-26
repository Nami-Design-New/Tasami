import { useInfiniteQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { adminAxiosInstance } from "../../../lib/adminAxios";

export default function useGetConsultaionDashComments() {
  const { id } = useParams();
  const {
    data: consultaionDashComments,
    isLoading: commentsLoading,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["dh-consultation-comments", id],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await adminAxiosInstance.get("dh-consultation-comments", {
        params: { consultation_id: id, page: pageParam },
      });
      if (res.data.code !== 200) {
        throw new Error("Failed to fetch consultaion dashboard comments");
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
    consultaionDashComments,
    commentsLoading,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  };
}
