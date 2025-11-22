import { useInfiniteQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";

export default function useGetCountries({ search, pagination = "on" } = {}) {
  const { data, isLoading, isError, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["countries", search, pagination],
      queryFn: async ({ pageParam = 1 }) => {
        const res = await axiosInstance.get("/countries", {
          params:
            pagination === "off"
              ? {
                  search,
                  pagination,
                }
              : {
                  search,
                  pagination,
                  page: pageParam,
                },
        });

        if (res.data.code !== 200) {
          throw new Error(res.data.message || "Failed to fetch countries");
        }

        return res.data;
      },
      getNextPageParam: (lastPage) => {
        return lastPage?.next_page_url
          ? new URL(lastPage.next_page_url).searchParams.get("page")
          : undefined;
      },
    });

  const countries = data?.pages?.flatMap((page) => page.data || []) || [];

  return { data: countries, isLoading, isError, fetchNextPage, hasNextPage };
}
