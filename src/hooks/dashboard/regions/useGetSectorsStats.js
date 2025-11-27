import { useQuery } from "@tanstack/react-query";
import { adminAxiosInstance } from "../../../lib/adminAxios";

export default function useGetSectorsStats() {
  const { data: sectorsStats, isLoading } = useQuery({
    queryKey: ["sectors-stats"],
    queryFn: async () => {
      const res = await adminAxiosInstance.get("dh-areas-statistics");
      if (res.data.code !== 200) {
        throw new Error(res.data.message, "Error get stats");
      }
      return res.data;
    },
  });
  return { sectorsStats, isLoading };
}
