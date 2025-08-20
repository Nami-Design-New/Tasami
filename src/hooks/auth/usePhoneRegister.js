import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";

export default function usePhoneRegister() {
  const {
    mutate: verificationCode,
    isPending,
    error,
    data,
  } = useMutation({
    mutationFn: async ({ phone, code }) => {
      const payload = {
        phone,
        phone_code: code,
        type: "register ",
      };
      const res = await axiosInstance.post("auth/send-code", payload);
      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Something went wrong");
      }
      return res.data;
    },
  });

  return { verificationCode, isPending, error, data };
}
