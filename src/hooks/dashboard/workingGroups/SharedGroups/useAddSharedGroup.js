import { useMutation } from "@tanstack/react-query";
import { adminAxiosInstance } from "../../../../lib/adminAxios";

export default function useAddSharedGroup() {
  const { mutate: addSharedGroup, isPending } = useMutation({
    mutationFn: async (payload) => {
      const res = await adminAxiosInstance.post("dh-shared-groups", payload);
      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Error Add Shared Group");
      }
      return res.data;
    },
  });
  return { addSharedGroup, isPending };
}
