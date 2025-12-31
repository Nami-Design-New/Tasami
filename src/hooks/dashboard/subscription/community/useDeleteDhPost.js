import { useMutation } from "@tanstack/react-query";
import { adminAxiosInstance } from "../../../../lib/adminAxios";

export default function useDeleteDhPost() {
  const { mutate: deleteDhPost, isPending: isDeletingDhPost } = useMutation({
    mutationFn: async (id) => {
      const res = await adminAxiosInstance.delete(`dh-community-posts/${id}`);
      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Error deleting Post");
      }
      return res.data;
    },
  });
  return { deleteDhPost, isDeletingDhPost };
}
