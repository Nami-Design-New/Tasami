
import { useMutation } from "@tanstack/react-query";
import { adminAxiosInstance } from "../../../../lib/adminAxios";

export default function useUpdateTaskCategory() {
  const { mutate: updateTaskCategory, isPending: updateTaskCategoryLoading } = useMutation({
    mutationFn: async ({ id, payload }) => {
      const res = await adminAxiosInstance.post(`dh-task-categories/${id}`, {
        _method: "put",
        ...payload
      });

      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Error update task category");
      }

      return res.data;
    },
  })

  return { updateTaskCategory, updateTaskCategoryLoading };
}