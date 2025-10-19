import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../../../lib/axios";

export default function useUpdateTask() {
  const { mutate: updateTask, isPending } = useMutation({
    mutationFn: async (payload) => {
      const res = await axiosInstance.put(`tasks/${payload?.work_id}`, null, {
        params: payload,
      });
    },
  });
  return { updateTask, isPending };
}
