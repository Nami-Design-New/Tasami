import { useMutation } from "@tanstack/react-query";
import { useParams } from "react-router";
import { axiosInstance } from "../../../../lib/axios";

export default function useAddPostComments() {
  const { id } = useParams();
  const { mutate: addPostComment, isPending } = useMutation({
    mutationFn: async (comment) => {
      const res = await axiosInstance.post("post-comments", {
        post_id: id,
        comment,
      });
      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Failed to  comment on Post");
      }
      return res.data;
    },
  });

  return { addPostComment, isPending };
}
