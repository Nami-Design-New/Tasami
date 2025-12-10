import { useQuery } from "@tanstack/react-query";
import { adminAxiosInstance } from "../../../lib/adminAxios";

export default function useGetUserContract(
  search = "",
  page = 1,
  pageSize = 10,
  user_id
) {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["dh-user-contract", user_id, search, page, pageSize],
    queryFn: async () => {
      const res = await adminAxiosInstance.post(
        `dh-user-contracts`,
        {
          user_id, 
        },
        {
          params: {
            search,
            page,
            limit_per_page: pageSize,
          },
        }
      );

      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Error fetching users contracts");
      }

      return res.data;
    },
    keepPreviousData: true,
  });

  return {
    userContract: data?.data || [],
    currentPage: data?.current_page || 1,
    lastPage: data?.last_page || 1,
    isLoading,
    isError,
    refetch,
  };
}
