import { useMutation } from "@tanstack/react-query";
import { adminAxiosInstance } from "../../../../lib/adminAxios";

export default function useAdminLogout() {
  const { mutate: adminLogout, isPending } = useMutation({
    mutationFn: async () => {
      const res = await adminAxiosInstance.post("auth/dh-logout");

      if (res.data.code !== 200) {
        throw new Error(res.data.message, "Admin Logout failed");
      }
      return res.data;
    },
  });
  return { adminLogout, isPending };
}
