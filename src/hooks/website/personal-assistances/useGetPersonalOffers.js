import { useInfiniteQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../lib/axios";
import { useSearchParams } from "react-router";

export default function useGetPersonalOffers() {
  const [searchParams] = useSearchParams();

  const params = {
    city_id: searchParams.get("city"),
    nationality_id: searchParams.get("nationality"),
    category_id: searchParams.get("field"),
    sub_category_id: searchParams.get("specialization"),
    preferred_gender: searchParams.get("gender"),
    price_min: searchParams.get("priceMin"),
    price_max: searchParams.get("priceMax"),
    age_min: searchParams.get("ageMin"),
    age_max: searchParams.get("ageMax"),
    search_word: searchParams.get("search"),
    pagination: "on",
  };

  if (searchParams.get("rate") && searchParams.get("rate") !== "all") {
    params.rate = searchParams.get("rate");
  }

  if (searchParams.getAll("helpMechanism").length > 0) {
    const helps = searchParams.getAll("helpMechanism");
    if (!helps.includes("all")) {
      params.help_mechanism_ids = helps;
    }
  }

  const {
    data: personalOffers,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: [
      "personal-offers",
      params.city_id,
      params.nationality_id,
      params.category_id,
      params.sub_category_id,
      params.preferred_gender,
      params.search_word,
    ],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await axiosInstance.get("help-services", {
        params: { ...params, page: pageParam },
      });
      if (res.data.code !== 200) {
        throw new Error(res.data.message || "error fetching assistants");
      }
      return res.data;
    },
    getNextPageParam: (lastPage) =>
      lastPage?.next_page_url
        ? new URL(lastPage.next_page_url).searchParams.get("page")
        : undefined,
  });

  const offers = personalOffers?.pages.flatMap((page) => page.data ?? []) ?? [];

  return {
    offers,
    personalOffers,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
}
