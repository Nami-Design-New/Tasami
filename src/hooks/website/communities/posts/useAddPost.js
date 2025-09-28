import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../../../lib/axios";

export default function useAddPost() {
  const { mutate: addPost, isPending } = useMutation({
    mutationFn: async (payload) => {
      const res = await axiosInstance.post("posts", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Error Adding Post");
      }

      return res.data;
    },
  });
  return { addPost, isPending };
}
