import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";

export default function useChangeNotificationsSettings() {
  const { mutate: changeNotificationSettings, isPending } = useMutation({
    mutationFn: async ({ data }) => {
      const res = await axiosInstance.post("notification-setting", data);
      if (res.data.code !== 200) {
        throw new Error(res.data.message);
      }
      return res.data;
    },
  });
  return { changeNotificationSettings, isPending };
}
