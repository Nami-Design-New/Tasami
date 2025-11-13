import { useQuery } from "@tanstack/react-query";
import { adminAxiosInstance } from "../../../lib/adminAxios";

export default function useGetWorkingGroups(
  search = "",
  page = 1,
  pageSize = 10
) {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["dashboard-working-group", search, page, pageSize],
    queryFn: async () => {
      const res = await adminAxiosInstance.get("dh-working-groups", {
        params: { search, page, limit_per_page: pageSize },
      });

      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Error fetching working groups");
      }

      return res.data;
    },
    keepPreviousData: true,
  });

  return {
    workingGroups: data?.data || [],
    stats: data
      ? {
          group_count: data.group_count,
          executive_count: data.executive_count,
          leader_count: data.leader_count,
          manager_count: data.manager_count,
          supervisor_count: data.supervisor_count,
          customer_service_count: data.customer_service_count,
        }
      : {},
    currentPage: data?.current_page || 1,
    lastPage: data?.last_page || 1,
    isLoading,
    isError,
    refetch,
  };
}
