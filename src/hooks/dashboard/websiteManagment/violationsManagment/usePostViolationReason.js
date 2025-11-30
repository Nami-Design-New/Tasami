
import { useMutation } from "@tanstack/react-query";
import { adminAxiosInstance } from "../../../../lib/adminAxios";

export default function usePostViolationReason() {
  const { mutate: postViolationReason, isPending } = useMutation({
    mutationFn: async (payload) => {
      const res = await adminAxiosInstance.post(`dh-violation-reason`, payload);

      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Error post violation reason");
      }

      return res.data;
    },
  })

  return { postViolationReason, isPending };
}