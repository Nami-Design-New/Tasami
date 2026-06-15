import { useMutation } from "@tanstack/react-query";
import { adminAxiosInstance } from "../../../lib/adminAxios";

export default function useDeleteCategory() {
  const { mutate: deleteCategory, isPending } = useMutation({
    mutationFn: async (id) => {
      const res = await adminAxiosInstance.delete(`dh-categories/${id}`);
      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Error Deleting Category");
      }
      return res.data;
    },
  });

  return { deleteCategory, isPending };
}
