import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../../../lib/axios";

export default function useReorderTasks() {
  const { mutate: reorderTasks, isPending } = useMutation({
    mutationFn: async (tasksIds) => {
      const res = await axiosInstance.post("tasks-positions", {
        task_ids: tasksIds,
      });
      if (res.data.code !== 200) {
        throw new Error(res.data.message, "Error Reorder Tasks");
      }

      return res.data;
    },
  });
  return { reorderTasks, isPending };
}
