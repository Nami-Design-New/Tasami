
import { useMutation } from "@tanstack/react-query";
import { adminAxiosInstance } from "../../../../lib/adminAxios";

export default function useDeleteTaskCategory() {
  const { mutate: deleteTaskCategory, isPending: isDeletingTaskCategory } = useMutation({
    mutationFn: async (taskCategoryId) => {
      const res = await adminAxiosInstance.delete(`dh-task-categories/${taskCategoryId}`);

      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Error delete task category");
      }

      return res.data;
    },
  })

  return { deleteTaskCategory, isDeletingTaskCategory };
}