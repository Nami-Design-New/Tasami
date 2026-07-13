import { useQuery } from "@tanstack/react-query";
import { adminAxiosInstance } from "../../../lib/adminAxios";

export default function useGetHomeStatistics() {
  const { data: homeStatistics, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["dashboard-home"],
    queryFn: async () => {
      const res = await adminAxiosInstance("dh-home");
      return res.data.data;
    },
  });
  return { homeStatistics, isLoading, isError, error, refetch };
}
