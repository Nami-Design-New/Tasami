import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../../lib/axios";

export default function usePostAddToTask() {
  const { mutate: addToTask, isPending: isAddingToTask } = useMutation({
    mutationFn: async (id) => {
      const res = await axiosInstance.post(`dh-tasks-notifications`, {task_id:id});
      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Something went wrong");
      }
      return res.data;
    },
  });
  return { addToTask, isAddingToTask };
}
