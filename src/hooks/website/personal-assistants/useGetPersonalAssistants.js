import { useInfiniteQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../lib/axios";
import { useSearchParams } from "react-router";

export default function useGetPersonalAssistants() {
  const [searchParams] = useSearchParams();
  const params = {
    city_id: searchParams.get("city_id"),
    nationality_id: searchParams.get("nationality_id"),
    category_id: searchParams.get("category_id"),
    sub_category_id: searchParams.get("sub_category_id"),
    preferred_gender: searchParams.get("preferred_gender"),
    search_word: searchParams.get("search_word"),
  };
  const {
    data: assistantsData,
    isLoading,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["personal-assistants"],
    queryFn: async () => {
      const res = await axiosInstance.get("helpers", { params });

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
    assistantsData,
    isLoading,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  };
}
