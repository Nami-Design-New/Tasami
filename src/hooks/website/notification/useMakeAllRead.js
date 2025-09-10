import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../../lib/axios";

export default function useMakeAllRead() {
  const { mutate: markAllAsRead, isPending } = useMutation({
    mutationFn: async () => {
      const res = await axiosInstance.get("notifications/all");
      if (res.data.code !== 200) {
        throw new Error(res.data.message);
      }
      return res.data;
    },
  });
  return { markAllAsRead, isPending };
}
