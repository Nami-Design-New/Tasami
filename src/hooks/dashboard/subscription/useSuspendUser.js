import { useMutation } from "@tanstack/react-query";
import { adminAxiosInstance } from "../../../lib/adminAxios";

export default function useSuspendUser() {
  const { mutate: suspendUser, isPending } = useMutation({
    mutationFn: async (payload) => {
      const res = await adminAxiosInstance.post("dh-users", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Failed to suspend user");
      }
      return res.data;
    },
  });
  return { suspendUser, isPending };
}
