import { useQuery } from "@tanstack/react-query";
import { adminAxiosInstance } from "../../../lib/adminAxios";

export default function useGetCommunityMeetings(
  page = 1,
  pageSize = 10,
  id
) {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["dh-community-meetings", id, page, pageSize],
    queryFn: async () => {
      const res = await adminAxiosInstance.get(`dh-community-meetings`, {
        params: {
          page,
          limit_per_page: pageSize,
          community_id: id
        },
      }
      );

      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Error fetching users  meetings communities");
      }

      return res.data;
    },
    keepPreviousData: true,
  });

  return {
    communityMeetings: data?.data || [],
    currentPage: data?.current_page || 1,
    lastPage: data?.last_page || 1,
    isLoading,
    isError,
    refetch,
  };
}
