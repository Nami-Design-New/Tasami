import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../../../lib/axios";

export default function useHandelToggleLikePosts() {
  const { mutate: toggleLike, likePending } = useMutation({
    mutationFn: async (id) => {
      const res = await axiosInstance.post("post-likes", {
        post_id: id,
      });
      if (res.data.code !== 200) {
        throw new Error("Error toggling like");
      }
      return res.data;
    },
  });
  return { toggleLike, likePending };
}
