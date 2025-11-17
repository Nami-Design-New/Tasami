import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../../../lib/axios";

export default function useUpdateTask() {
  const { mutate: updateTask, isPending } = useMutation({
    mutationFn: async ({ id, ...payload }) => {
      const res = await axiosInstance.put(`tasks/${id}`, null, {
        params: payload,
      });
      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Error Editng task");
      }
      return res.data;
    },
  });
  return { updateTask, isPending };
}
