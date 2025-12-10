
import { useMutation } from "@tanstack/react-query";
import { adminAxiosInstance } from "../../../../lib/adminAxios";

export default function usePostSocialLink() {
  const { mutate: postSocialLink, isPending } = useMutation({
    mutationFn: async (payload) => {
      const res = await adminAxiosInstance.post(`dh-social-links`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Error post social link");
      }

      return res.data;
    },
  })

  return { postSocialLink, isPending };
}