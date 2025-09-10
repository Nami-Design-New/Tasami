import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../../lib/axios";

export default function useDeleteAllNotifications() {
  const { mutate: deleteAllNotifications, isPending } = useMutation({
    mutationFn: async () => {
      const res = await axiosInstance.delete("notifications/all");

      if (res.data.code !== 200) {
        throw new Error(res.data.message);
      }
      return res.data;
    },
  });
  return { deleteAllNotifications, isPending };
}
