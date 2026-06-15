import { useMutation } from "@tanstack/react-query";
import { adminAxiosInstance } from "../../../lib/adminAxios";

export default function useEditCategory() {
  const { mutate: editCategory, isPending } = useMutation({
    mutationFn: async ({ id, payload }) => {
      const res = await adminAxiosInstance.put(`dh-categories/${id}`, payload);
      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Error Editing Category");
      }
      return res.data;
    },
  });

  return { editCategory, isPending };
}
