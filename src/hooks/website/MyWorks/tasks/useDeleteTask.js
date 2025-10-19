import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../../../lib/axios";

export default function useDeleteTask() {
  const { mutate: deleteTask, isPending } = useMutation({
    mutationFn: async (id) => {
      const res = await axiosInstance.delete(`tasks/${id}`);
      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Error Deleting Task");
      }
      return res.data;
    },
  });
  return { deleteTask, isPending };
}
