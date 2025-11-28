import { useQuery } from "@tanstack/react-query";
import { adminAxiosInstance } from "../../../../lib/adminAxios";

export default function useGetSettings() {
  const { data: settings, isLoading } = useQuery({
    queryKey: ["dh-settings"],
    queryFn: async () => {
      const res = await adminAxiosInstance.get("dh-settings");
      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Error fetching settings");
      }
      return res.data;
    },
  });
  return { settings, isLoading };
}
