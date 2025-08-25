import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";

export function useSocialLoginMutation(options = {}) {
  const { mutate: socialLogin, isPending } = useMutation({
    mutationFn: async ({ social_id, image_url, name, email }) => {
      const res = await axiosInstance.post("auth/login-social", {
        social_id,
        image_url,
        name,
        email,
      });
      if (res?.data?.code !== 200) {
        throw new Error(res.data.message);
      }
      return res.data;
    },
    ...options,
  });

  return { socialLogin, isPending };
}
