import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../../../lib/axios";

export default function useEditPost() {
  const { mutate: editPost, isPending } = useMutation({
    mutationFn: async ({ postId, payload }) => {
      const res = await axiosInstance.post(`posts/${postId}`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Error Editing Post");
      }

      return res.data;
    },
  });
  return { editPost, isPending };
}
