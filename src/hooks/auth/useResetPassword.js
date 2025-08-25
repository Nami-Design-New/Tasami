import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";

export default function useResetPassword() {
  const { mutate: resetPassword, isPending } = useMutation({
    mutationFn: async (payload) => {
      const res = await axiosInstance.post("auth/reset-password", payload);
      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Something went wrong");
      }
      return res.data;
    },
  });
  return { resetPassword, isPending };
}
