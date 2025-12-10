
import { useMutation } from "@tanstack/react-query";
import { adminAxiosInstance } from "../../../../lib/adminAxios";

export default function useUpdateImageBanner() {
  const { mutate: updateImageBanner, isPending: updateBannerLoading } = useMutation({
    mutationFn: async ({ id, payload }) => {

      const res = await adminAxiosInstance.post(`dh-banners/${id}`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Error update dh banners");
      }

      return res.data;
    },
  })

  return { updateImageBanner, updateBannerLoading };
}