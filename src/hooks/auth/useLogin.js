import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";

export default function useLogin() {
  const { mutate: login, isPending } = useMutation({
    mutationFn: async (payload) => {
      const res = await axiosInstance.post("auth/login", payload);

      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Something went wrong");
      }
      return res.data;
    },
  });
  return { login, isPending };
}
