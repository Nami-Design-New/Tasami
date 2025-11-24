// src/hooks/dashboard/useInfiniteWorkingGroups.js
import { useInfiniteQuery } from "@tanstack/react-query";
import { adminAxiosInstance } from "../../../lib/adminAxios";

export default function useInfiniteWorkingGroups(search = "") {
  return useInfiniteQuery({
    queryKey: ["dashboard-working-group-infinite", search],

    queryFn: async ({ pageParam = 1 }) => {
      const res = await adminAxiosInstance.get("dh-working-groups", {
        params: {
          search,
          page: pageParam,
          limit_per_page: 10,
        },
      });

      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Error fetching working groups");
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
}
