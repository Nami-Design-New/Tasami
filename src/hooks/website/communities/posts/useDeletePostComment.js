import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../../../lib/axios";

export default function useDeletePostComment() {
  const { mutate: deletePostComment, isPending } = useMutation({
    mutationFn: async (id) => {
      const res = await axiosInstance.delete(`post-comments/${id}`);
      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Failed to delete comment");
      }
      return res.data;
    },
  });
  return { deletePostComment, isPending };
}
