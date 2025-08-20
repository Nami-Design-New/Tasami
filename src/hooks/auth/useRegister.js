import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";

export default function useRegister() {
  const {
    mutate: signup,
    isPending,
    error,
  } = useMutation({
    mutationFn: async (payload) => {
      // Convert payload to FormData
      const formData = new FormData();
      for (const key in payload) {
        if (payload[key] !== undefined && payload[key] !== null) {
          formData.append(key, payload[key]);
        }
      }

      const res = await axiosInstance.post("auth/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Something went wrong");
      }
      return res.data;
    },
  });
  return { signup, isPending, error };
}
