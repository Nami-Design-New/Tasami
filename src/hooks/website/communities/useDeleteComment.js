import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../../lib/axios";

export default function useDeleteComment() {
  const { mutate: deleteComment, isPending } = useMutation({
    mutationFn: async (commentId) => {
      const res = await axiosInstance.delete(
        `consultation-comments/${commentId}`
      );
      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Failed to delete comment");
      }
      return res.data;
    },
  });
  return { deleteComment, isPending };
}
