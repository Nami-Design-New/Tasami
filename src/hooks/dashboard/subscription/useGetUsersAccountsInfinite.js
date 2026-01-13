import { useInfiniteQuery } from "@tanstack/react-query";
import { adminAxiosInstance } from "../../../lib/adminAxios";

export default function useGetUsersAccountsInfinite(
  search = "",
  pageSize = 10
) {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["users-accounts-infinite", search, pageSize],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await adminAxiosInstance.get("dh-users", {
        params: {
          search,
          page: pageParam,
          limit_per_page: pageSize,
        },
      });

      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Error fetching users accounts");
      }

      return res.data;
    },

    getNextPageParam: (lastPage) => {
      if (lastPage.current_page < lastPage.last_page) {
        return lastPage.current_page + 1;
      }
      return undefined;
    },
  });

  return {
    usersAccounts: data?.pages.flatMap((page) => page.data || []) || [],

    currentPage: data?.pages[data.pages.length - 1]?.current_page || 1,

    lastPage: data?.pages[data.pages.length - 1]?.last_page || 1,

    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  };
}
