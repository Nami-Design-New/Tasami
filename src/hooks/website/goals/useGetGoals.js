import { useInfiniteQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../lib/axios";
import { useSearchParams } from "react-router";

export default function useGetGoals() {
  const [searchParams] = useSearchParams();
  const params = {
    city_id: searchParams.get("city"),
    nationality_id: searchParams.get("nationality"),
    category_id: searchParams.get("field"),
    sub_category_id: searchParams.get("specialization"),
    preferred_gender: searchParams.get("gender"),
    search_word: searchParams.get("search"),
    help_start_date: searchParams.get("startDate"),
    help_mechanism_ids: searchParams.getAll("helpMechanism"),
  };
  const {
    data: goals,
    isLoading,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["personal-assistants", params],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await axiosInstance.get("goals", {
        params: {
          ...params,
          page: pageParam,
        },
      });

      if (res.data.code !== 200) {
        throw new Error(res.data.message || "error fetching assistants");
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
    goals,
    isLoading,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  };
}
