import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";

export default function useOtpConfirmation() {
  const {
    mutate: confirmOtp,
    isPending,
    error,
    data,
  } = useMutation({
    mutationFn: async ({ phone, phoneCode, otp }) => {
      const payload = {
        phone,
        phone_code: phoneCode,
        code: otp,
      };
      const res = await axiosInstance.post("auth/confirm-code", payload);
      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Something went wrong");
      }
      return res.data;
    },
  });

  return { confirmOtp, isPending, error, data };
}
