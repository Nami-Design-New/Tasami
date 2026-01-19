import { useMutation } from "@tanstack/react-query";
import { adminAxiosInstance } from "../../../lib/adminAxios";

export default function useResetPassord() {
  const { mutate: resetPassword, isPending } = useMutation({
    mutationFn: async (payload) => {
      const res = await adminAxiosInstance.post(
        "auth/dh-reset-password",
        payload,
      );
      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Something went wrong");
      }
      return res.data;
    },
  });
  return { resetPassword, isPending };
}
