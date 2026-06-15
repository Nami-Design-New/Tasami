import { useMutation } from "@tanstack/react-query";
import { adminAxiosInstance } from "../../../lib/adminAxios";

export default function useAddCategory() {
  const { mutate: addCategory, isPending } = useMutation({
    mutationFn: async (payload) => {
      const res = await adminAxiosInstance.post("dh-categories", payload);
      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Error Adding Category");
      }
      return res.data;
    },
  });

  return { addCategory, isPending };
}
