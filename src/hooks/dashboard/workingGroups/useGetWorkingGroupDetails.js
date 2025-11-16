import { useQuery } from "@tanstack/react-query";
import { adminAxiosInstance } from "../../../lib/adminAxios";

export default function useGetWorkingGroupdetails(
  workingGroupId,
  search = "",
  page = 1,
  pageSize = 10,
  enabled = true
) {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["working-group-detais", workingGroupId, search, page, pageSize],
    queryFn: async () => {
      const res = await adminAxiosInstance.get(
        `dh-working-groups/${workingGroupId}`
      );
      if (res.data.code !== 200) {
        throw new Error(res.data.error || "Error fetching Group Details");
      }

      return res.data;
    },
    keepPreviousData: true,
    enabled,
  });
  console.log(data);

  return {
    workinGroupData: data?.group,
    workingGoupDetails: data
      ? [
          data.customer_services,
          data.executives,
          data.leaders,
          data.managers,
          data.supervisors,
        ]
      : [],
    workingMembers: data?.data || [],
    currentPage: data?.current_page || 1,
    lastPage: data?.last_page || 1,
    isLoading,
    isError,
    refetch,
  };
}
