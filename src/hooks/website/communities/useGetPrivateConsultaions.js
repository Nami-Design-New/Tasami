import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import { axiosInstance } from "../../../lib/axios";

export default function useGetPrivateConsultaions() {
  const [searchParams] = useSearchParams();
  const searchWord = searchParams.get("search") || "";
  const {
    data: privateConsultaions,
    isLoading,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["private-consultaions", searchWord],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await axiosInstance.get("consultations", {
        params: {
          page: pageParam,
          type: "private",
          ...(searchWord ? { search: searchWord } : {}),
        },
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
    privateConsultaions,
    isLoading,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  };
}
