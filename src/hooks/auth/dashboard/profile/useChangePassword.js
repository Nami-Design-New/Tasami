import { useMutation } from "@tanstack/react-query";
import { adminAxiosInstance } from "../../../../lib/adminAxios";

export default function useChangePassword() {
  const { mutate: changePassword, isPending } = useMutation({
    mutationFn: async (payload) => {
      const res = await adminAxiosInstance.post("auth/dh-profile", payload);
      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Error Update password");
      }
      return res.data;
    },
  });
  return { changePassword, isPending };
}
