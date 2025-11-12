import { useQuery } from "@tanstack/react-query";
import { adminAxiosInstance } from "../../../lib/adminAxios";

export default function useGetHomeStatistics() {
  const { data: homeStatistics, isLoading } = useQuery({
    queryKey: ["dashboard-home"],
    queryFn: async () => {
      const res = await adminAxiosInstance("dh-home");
      if (res.data.code !== 200) {
        throw new Error(res.data.error);
      }
      return res.data.data;
    },
  });
  return { homeStatistics, isLoading };
}
