import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../../lib/axios";

export default function useDeleteExp() {
  const { mutate: deleteExp, isPending } = useMutation({
    mutationFn: async (id) => {
      const res = await axiosInstance.delete(`user-experience/${id}`);
      if (res.data.code !== 200) {
        throw new Error(res.data.message);
      }
      return res.data;
    },
  });
  return { deleteExp, isPending };
}
