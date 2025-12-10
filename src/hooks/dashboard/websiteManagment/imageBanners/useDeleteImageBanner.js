
import { useMutation } from "@tanstack/react-query";
import { adminAxiosInstance } from "../../../../lib/adminAxios";

export default function useDeleteImageBanner() {
  const { mutate: deleteImageBanner, isPending: isDeletingImageBanner } = useMutation({
    mutationFn: async (imageBannerId) => {
      const res = await adminAxiosInstance.delete(`dh-banners/${imageBannerId}`);

      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Error delete dh Banner");
      }

      return res.data;
    },
  })

  return { deleteImageBanner, isDeletingImageBanner };
}