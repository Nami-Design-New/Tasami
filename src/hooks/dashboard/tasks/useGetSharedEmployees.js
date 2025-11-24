import { useQuery } from "@tanstack/react-query";
import { adminAxiosInstance } from "../../../lib/adminAxios";

export default function useGetSharedEmployees(
  search = "",
  page = 1,
  pageSize = 10
) {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["shared-employees", search, page, pageSize],
    queryFn: async () => {
      const res = await adminAxiosInstance.get("dh-shared-employees");

      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Error fetching employees");
      }

      return res.data;
    },
    keepPreviousData: true,
  });

  return {
    employees: data?.data || [],
    isLoading,
    isError,
    refetch,
  };
}
