import { useMutation } from "@tanstack/react-query";
import { adminAxiosInstance } from "../../../lib/adminAxios";

export default function useDeleteSubject() {
  const { mutate: deleteSubject, isPending: isDeletingSubject } = useMutation({
    mutationFn: async (subjectId) => {
      const res = await adminAxiosInstance.delete(
        `dh-task-systems/${subjectId}`
      );
      if (res.data.code !== 200) {
        throw new Error(res.message || "Error deleting subject");
      }
      return res.data;
    },
  });
  return { deleteSubject, isDeletingSubject };
}
