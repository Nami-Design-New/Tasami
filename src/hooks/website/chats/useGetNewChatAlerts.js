import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../lib/axios";
import { getToken } from "../../../utils/token";

export default function useGetNewChatAlerts() {
  const token = getToken();
  const {
    data,
    isLoading,
    isFetching,
    error,
  } = useQuery({
    queryKey: ["quick-chat-alerts"],
    queryFn: async () => {
      const res = await axiosInstance.get("my-conversations");

      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Error fetching conversations");
      }

      return res.data;
    },
    enabled: !!token,
  });

  return {
    newChatAlerts: data?.data || [],
    isLoading,
    isFetching,
    error,
  };
}
