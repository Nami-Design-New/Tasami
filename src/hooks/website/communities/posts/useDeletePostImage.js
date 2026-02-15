import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../../../lib/axios";

export default function useDeletePostImage() {
  const { mutate: deletePostImage, isPending: isDeletingPostImage } =
    useMutation({
      mutationFn: async (postId) => {
        const res = await axiosInstance.delete(`/post-images/${postId}`);
        if (res.data.code !== 200) {
          throw new Error(res.data.message || "Error Deleteing Post");
        }
        return res.data;
      },
    });

  return { deletePostImage, isDeletingPostImage };
}
