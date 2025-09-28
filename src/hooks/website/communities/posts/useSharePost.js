import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../../../lib/axios";

export default function useSharePost() {
  return useMutation({
    mutationFn: async (id) => {
      const { data } = await axiosInstance.post("post-share", {
        post_id: id,
      });
      if (data.code !== 200) {
        throw new Error("Error sharing Post");
      }
      return data;
    },
  });
}
