import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../../../lib/axios";

export default function useDeleteAllTasks() {
  const { mutate: deleteAllTasks, isPending: isDeleting } = useMutation({
    mutationFn: async (workId) => {
      const res = await axiosInstance.delete(`delete-all-tasks/${workId}`);
      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Error Deleting Tasks");
      } else {
        return res.data;
      }
    },
  });

  return { isDeleting, deleteAllTasks };
}
