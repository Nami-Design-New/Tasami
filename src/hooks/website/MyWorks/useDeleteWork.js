import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../../lib/axios";

export default function useDeleteWork() {
  const { mutate: deleteWork, isPending } = useMutation({
    mutationFn: async (id) => {
      const res = await axiosInstance.delete(`my-works/${id}`);
      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Error Deleting Goal");
      }
      return res.data;
    },
  });
  return { deleteWork, isPending };
}
