import { useMutation } from "@tanstack/react-query";
import { adminAxiosInstance } from "../../../../lib/adminAxios";

export default function usePostImageBanner() {
  const { mutate: postImageBanner, isPending } = useMutation({
    mutationFn: async (payload) => {
      const res = await adminAxiosInstance.post(`dh-banners`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Error post dh banners");
      }

      return res.data;
    },
  });

  return { postImageBanner, isPending };
}