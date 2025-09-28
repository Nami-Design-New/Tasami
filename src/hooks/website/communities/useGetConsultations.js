import { useInfiniteQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { axiosInstance } from "../../../lib/axios";

export default function useGetConsultations(type) {
  const { id } = useParams();
  const {
    data: consultaions,
    isLoading,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["consultaions", id, type],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await axiosInstance.get("consultations", {
        params: { community_id: id, page: pageParam, type },
      });

      if (res.data.code !== 200) {
        throw new Error(res.data.message);
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
