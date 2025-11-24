import { useMutation } from "@tanstack/react-query";
import { adminAxiosInstance } from "../../../lib/adminAxios";

export default function useEditSubject() {
  const { mutate: editSubject, isPending: isEditingSubject } = useMutation({
    mutationFn: async ({ id, subjectData }) => {
      const res = await adminAxiosInstance.post(
        `dh-task-systems/${id}`,
        subjectData
      );
      if (res.data.code !== 200) {
        throw new Error(res.message || "Error adding new subject");
      }
      return res.data;
    },
  });
  return { editSubject, isEditingSubject };
}
