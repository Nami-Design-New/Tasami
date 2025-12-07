import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import { adminAxiosInstance } from "../../../lib/adminAxios";

export default function useGetChats() {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search");
  const {
    data: chatRooms,
    isLoading,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["chats"],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await adminAxiosInstance.get("dh-chats", {
        search,
        page: pageParam,
      });

      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Error fetching chats rooms");
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
    chatRooms,
    isLoading,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  };
}
// import { useInfiniteQuery } from "@tanstack/react-query";
// import { adminAxiosInstance } from "../../../lib/adminAxios";

// export default function useGetChats() {
//   return useInfiniteQuery({
//     queryKey: ["chat-rooms"],
//     queryFn: async ({ pageParam = 1 }) => {
//       const res = await adminAxiosInstance.get("dh-chats", {
//         params: { page: pageParam },
//       });

//       if (res.data.code !== 200) {
//         throw new Error(res.data.message);
//       }

//       return res.data;
//     },
//     getNextPageParam: (lastPage) =>
//       lastPage?.next_page_url
//         ? new URL(lastPage.next_page_url).searchParams.get("page")
//         : undefined,
//   });
// }
