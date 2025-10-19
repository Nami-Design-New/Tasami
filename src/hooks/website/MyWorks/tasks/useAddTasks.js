import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../../../lib/axios";

export default function useAddTasks() {
  const { mutate: addNewTask, isPending } = useMutation({
    mutationFn: async (payload) => {
      const res = await axiosInstance.post("tasks", payload);
      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Error Adding New Task");
      }
      return res.data;
    },
  });
  return { addNewTask, isPending };
}
