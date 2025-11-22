import { useQuery } from "@tanstack/react-query";
import { adminAxiosInstance } from "../../../lib/adminAxios";

export default function useGetDraftedUsers(
  search = "",
  page = 1,
  pageSize = 10
) {
  const {
    data: draftedUsers,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["dashboard-drafted-users", page],
    queryFn: async () => {
      const res = await adminAxiosInstance.get("dh-draft-employees", {
        params: { search, page, limit_per_page: pageSize },
      });

      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Error fetching data");
      }

      return res.data;
    },
    keepPreviousData: true,
  });

  return {
    draftedUsers,
    isLoading,
    currentPage: draftedUsers?.current_page || 1,
    lastPage: draftedUsers?.last_page || 1,
    isError,
    refetch,
  };
}
