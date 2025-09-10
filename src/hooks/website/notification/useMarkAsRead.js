import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../../lib/axios";

export default function useMarkAsRead() {
  const { mutate: markAsRead, isPending } = useMutation({
    mutationFn: async (id) => {
      const res = await axiosInstance.get(`notifications/${id}`);
      if (res.data.code !== 200) {
        throw new Error(res.data.message);
      }
      return res.data;
    },
  });
  return { markAsRead, isPending };
}
