import { useMutation } from "@tanstack/react-query";
import { adminAxiosInstance } from "../../../../lib/adminAxios";

export default function useUpdateSocialLink() {
  const { mutate: updateSocialLink, isPending: updateSocialLoading } =
    useMutation({
      mutationFn: async ({ id, payload }) => {
        const res = await adminAxiosInstance.post(
          `dh-social-links/${id}`,
          payload,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (res.data.code !== 200) {
          throw new Error(res.data.message || "Error update social links");
        }

        return res.data;
      },
    });

  return { updateSocialLink, updateSocialLoading };
}
