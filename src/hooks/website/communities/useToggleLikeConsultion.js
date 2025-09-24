import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../../lib/axios";

export default function useToggleLikeConsultion() {
  const { mutate: toggleLike, isPending } = useMutation({
    mutationFn: async (id) => {
      const res = await axiosInstance.post("consultation-likes", {
        consultation_id: id,
      });
      if (res.data.code !== 200) {
        throw new Error("Error toggling like");
      }
      return res.data;
    },
  });
  return { toggleLike, isPending };
}
