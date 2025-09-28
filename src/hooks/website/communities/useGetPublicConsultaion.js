import { useInfiniteQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../lib/axios";

export default function useGetPublicConsultations() {
  const {
    data: publicConsultaions,
    isLoading,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["public-consultaions"],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await axiosInstance.get("consultations", {
        params: { page: pageParam, type: "public" },
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
    publicConsultaions,
    isLoading,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  };
}
