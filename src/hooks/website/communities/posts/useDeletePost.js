import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../../../lib/axios";

export default function useDeletePost() {
  const { mutate: deletePost, isPending: isDeletingPost } = useMutation({
    mutationFn: async (id) => {
      const res = await axiosInstance.delete(`posts/${id}`);
      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Error deleting Post");
      }
      return res.data;
    },
  });
  return { deletePost, isDeletingPost };
}
