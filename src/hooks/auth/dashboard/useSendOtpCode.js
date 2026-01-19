import { useMutation } from "@tanstack/react-query";
import { adminAxiosInstance } from "../../../lib/adminAxios";

export default function useSendOtpCode() {
  const {
    mutate: sendCode,
    isPending,
    error,
  } = useMutation({
    mutationFn: async ({ email }) => {
      const payload = {
        email,
      };
      const res = await adminAxiosInstance.post(
        "auth/dh-send-confirmation",
        payload,
      );
      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Something went wrong");
      }
      return res.data;
    },
  });

  return { sendCode, isPending, error };
}
