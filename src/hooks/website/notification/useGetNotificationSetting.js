import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../lib/axios";

export default function useGetNotificationSetting() {
  const { data: notificationSetting, isLoading } = useQuery({
    queryKey: ["notification-setting"],
    queryFn: async () => {
      const res = await axiosInstance.get("notification-setting");
      if (res.data.code !== 200) {
        throw new Error(res.data.message);
      }
      return res.data.data;
    },
  });
  return { notificationSetting, isLoading };
}
