import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../../../lib/axios";

export default function useAddTaskWithAi() {
  const { mutate: addTaskWithAi, isPending: isAdding } = useMutation({
    mutationFn: async (id) => {
      const res = await axiosInstance.post("generate-task-ai", {
        work_id: id,
      });
      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Error Add Tasks");
      }
      return res.data;
    },
  });
  return { addTaskWithAi, isAdding };
}
