import { useInfiniteQuery } from "@tanstack/react-query";
import { adminAxiosInstance } from "../../../lib/adminAxios";

export default function useGetCountries(regionId, enabled = true) {
  const {
    data,
    isLoading: isCountriesLaoding,
    fetchNextPage: fetchCountriesNextPage,
    hasNextPage: hasCountriesNextPage,
    isFetchingNextPage: isFetchingCountriesNextPage,
  } = useInfiniteQuery({
    queryKey: ["dashboard-cities", regionId],
    queryFn: async ({ pageParam }) => {
      const res = await adminAxiosInstance.get("dh-countries", {
        params: {
          page: pageParam,
          region_id: regionId,
        },
      });
      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Error fetching Countries");
      }
      return res.data;
    },
    getNextPageParam: (lastPage) => {
      // Returns the next page number if available
      return lastPage.next_page_url ? lastPage.current_page + 1 : undefined;
    },
    enabled,
  });
  // Flatten all pages into a single array
  const countries = data?.pages.flatMap((page) => page.data) || [];

  return {
    countries,
    isCountriesLaoding,
    fetchCountriesNextPage,
    hasCountriesNextPage,
    isFetchingCountriesNextPage,
  };
}
