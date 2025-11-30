
import { useMutation } from "@tanstack/react-query";
import { adminAxiosInstance } from "../../../../lib/adminAxios";

export default function usePostTaskCategory() {
  const { mutate: postTaskCategory, isPending } = useMutation({
    mutationFn: async (payload) => {
      const res = await adminAxiosInstance.post(`dh-task-categories`, payload);

      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Error post task category");
      }

      return res.data;
    },
  })

  return { postTaskCategory, isPending };
}