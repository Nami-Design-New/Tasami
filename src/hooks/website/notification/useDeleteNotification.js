import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../../lib/axios";

export default function useDeleteNotification() {
  const { mutate: deleteNotification, isPending } = useMutation({
    mutationFn: async (id) => {
      const res = await axiosInstance.delete(`notifications/${id}`);
      if (res.data.code !== 200) {
        throw new Error(res.data.message);
      }
      return res.data;
    },
  });
  return { deleteNotification, isPending };
}
