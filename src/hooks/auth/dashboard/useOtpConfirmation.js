import { useMutation } from "@tanstack/react-query";
import { adminAxiosInstance } from "../../../lib/adminAxios";

export default function useOtpConfirmation() {
  const {
    mutate: confirmOtp,
    isPending,
    error,
    data,
  } = useMutation({
    mutationFn: async ({ email, otp }) => {
      const payload = {
        email,
        code: otp,
      };
      const res = await adminAxiosInstance.post(
        "auth/dh-confirm-code",
        payload,
      );
      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Something went wrong");
      }
      return res.data;
    },
  });

  return { confirmOtp, isPending, error, data };
}
