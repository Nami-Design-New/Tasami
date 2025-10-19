import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../../../lib/axios";

export default function useUpdateTaskStatus() {
  const { mutate: updateTaskStatus, isPending } = useMutation({
    mutationFn: async ({ id, status }) => {
      const res = await axiosInstance.put(`tasks/${id}`, null, {
        params: {
          status,
        },
      });
      return res.data;
    },
  });
  return { updateTaskStatus, isPending };
}
