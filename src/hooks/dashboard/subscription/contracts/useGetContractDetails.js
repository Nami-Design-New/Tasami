import { useInfiniteQuery } from "@tanstack/react-query";
import { adminAxiosInstance } from "../../../../lib/adminAxios";

export default function useGetContractDetails(userId, contractCode) {
  const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["dh-contract-details", contractCode, userId],
      enabled: !!userId && !!contractCode,

      queryFn: async ({ pageParam = 1 }) => {
        const res = await adminAxiosInstance.get("dh-contracts", {
          params: {
            contract_code: contractCode,
            user_id: userId,
            page: pageParam,
          },
        });

        if (res.data.code !== 200) {
          throw new Error(res?.message || "Error fetching contract details");
        }

        return res.data;
      },

      getNextPageParam: (lastPage) => {
        return lastPage.current_page < lastPage.last_page
          ? lastPage.current_page + 1
          : undefined;
      },
    });

  // Paginated chat/messages
  const messages = data?.pages.flatMap((page) => page.data) ?? [];

  // These are the same for every page → take from first page
  const contract = data?.pages[0]?.contract ?? null;
  const work = data?.pages[0]?.work ?? null;

  return {
    messages,
    contract,
    work,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  };
}
