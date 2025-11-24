import { useMutation } from "@tanstack/react-query";
import { adminAxiosInstance } from "../../../../lib/adminAxios";

export default function useAdminLogin() {
  const { mutate: adminLogin, isPending } = useMutation({
    mutationFn: async (payload) => {
      const res = await adminAxiosInstance.post("auth/dh-login", payload);
      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Something went wrong");
      }
      return res.data;
    },
  });
  return { adminLogin, isPending };
}
