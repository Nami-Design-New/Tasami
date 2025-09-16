import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../../lib/axios";

export default function useFollow() {
  const { mutate: toggleFollow, isPending } = useMutation({
    mutationFn: async (id) => {
      const res = await axiosInstance.post("my-followers", {
        to_user_id: id,
      });
      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Error Following User");
      }
      return res.data;
    },
  });
  return { toggleFollow, isPending };
}
