import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";
import { getToken } from "../../utils/token";

export default function useGetCountersNotify() {
  const token = getToken();
  const { data: counterNotify, isLoading } = useQuery({
    queryKey: ["counters-notify"],
    queryFn: async () => {
      const res = await axiosInstance.get(`/counters`);
      if (res.data.code !== 200) {
        throw new Error(res.data.message);
      }

      return res.data.data;
    },
    enabled: !!token,
    // staleTime: Infinity
  });
  return { counterNotify, isLoading };
}
