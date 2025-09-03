import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../../lib/axios";

export default function useDeleteDoc() {
  const { mutate: deleteDoc, isPending } = useMutation({
    mutationFn: async (id) => {
      const res = await axiosInstance.delete(`user-documents/${id}`);
      if (res.data.code !== 200) {
        throw new Error(res.data.message);
      }
      return res.data;
    },
  });
  return { deleteDoc, isPending };
}
