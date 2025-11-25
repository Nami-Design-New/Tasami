import { useQuery } from "@tanstack/react-query";
import { adminAxiosInstance } from "../../../lib/adminAxios";

export default function useGetUserDetails(
  id
) {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["user-details", id],
    queryFn: async () => {
      const res = await adminAxiosInstance.get(`dh-users/${id}`,);

      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Error fetching users accounts");
      }

      return res.data;
    },
    keepPreviousData: true,
  });

  return {
    userDetails: data?.data || [],
    isLoading,
    isError,
    refetch,
  };
}
