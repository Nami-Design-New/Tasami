import { useInfiniteQuery } from "@tanstack/react-query";
import { adminAxiosInstance } from "../../../lib/adminAxios";

export default function useGetRegions(pagenation = "on", enabled = true) {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["dashboard-regions"],
      queryFn: async ({ pageParam = 1 }) => {
        const res = await adminAxiosInstance.get(
          `dh-regions?page=${pageParam}&pagenation=${pagenation}`
        );
        if (res.data.code !== 200) {
          throw new Error(res.data.message || "Error fetching regions");
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
  const regions = data?.pages.flatMap((page) => page.data) || [];

  return { regions, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage };
}
