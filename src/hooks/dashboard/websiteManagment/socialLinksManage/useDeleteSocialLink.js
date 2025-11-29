
import { useMutation } from "@tanstack/react-query";
import { adminAxiosInstance } from "../../../../lib/adminAxios";

export default function useDeleteSocialLink() {
  const { mutate: deleteSocialLink, isPending: isDeletingSocialLink } = useMutation({
    mutationFn: async (socialLinkId) => {
      const res = await adminAxiosInstance.delete(`dh-social-links/${socialLinkId}`);

      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Error delete social link");
      }

      return res.data;
    },
  })

  return { deleteSocialLink, isDeletingSocialLink };
}