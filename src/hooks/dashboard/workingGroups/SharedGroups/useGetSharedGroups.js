import { useInfiniteQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { adminAxiosInstance } from "../../../../lib/adminAxios";

export default function useGetSharedGroups() {
  const { id } = useParams();
  const {
    data: sharedGroups,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["shared-groups"],
    queryFn: async () => {
      const res = await adminAxiosInstance.get(`dh-shared-groups/${id}`);
      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Error Fetching Shared Groups");
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
    sharedGroups,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
}
