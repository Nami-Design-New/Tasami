import { useInfiniteQuery } from "@tanstack/react-query";
import { adminAxiosInstance } from "../../../lib/adminAxios";

export default function useGetCities(
  countryId,
  pagenation = "on",
  enabled = true,
) {
  const {
    data,
    isLoading: isCitiesLaoding,
    fetchNextPage: fetchCitiesNextPage,
    hasNextPage: hasCitiesNextPage,
    isFetchingNextPage: isFetchingCitiesNextPage,
  } = useInfiniteQuery({
    queryKey: ["dashboard-cities", countryId],
    queryFn: async ({ pageParam }) => {
      const res = await adminAxiosInstance.get("dh-cities", {
        params: {
          page: pageParam,
          country_id: countryId,
          pagenation,
        },
      });
      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Error fetching Cities");
      }
      return res.data;
    },
    getNextPageParam: (lastPage) => {
      // Returns the next page number if available
      return lastPage.next_page_url ? lastPage.current_page + 1 : undefined;
    },
    enabled,
    gcTime: undefined,
    staleTime: undefined,
  });
  // Flatten all pages into a single array
  const cities = data?.pages.flatMap((page) => page.data) || [];

  return {
    cities,
    isCitiesLaoding,
    fetchCitiesNextPage,
    hasCitiesNextPage,
    isFetchingCitiesNextPage,
  };
}
