import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";

export default function useSettings() {
  const {
    data: settings,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["settings"],
    queryFn: async () => {
      const res = await axiosInstance("settings");
      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Failed to fetch settings");
      }
      return res.data.data;
    },
  });
  return {
    settings,
    isLoading,
    error,
  };
}
