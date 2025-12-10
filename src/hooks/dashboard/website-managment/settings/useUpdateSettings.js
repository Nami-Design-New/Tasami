import { useMutation } from "@tanstack/react-query";
import { adminAxiosInstance } from "../../../../lib/adminAxios";

export default function useUpdateSettings() {
  const { mutate: updateSettings, isPending } = useMutation({
    mutationFn: async (payload) => {
      const res = await adminAxiosInstance.post("dh-settings", payload);
      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Error updating settings");
      }
      return res.data;
    },
  });
  return { updateSettings, isPending };
}
