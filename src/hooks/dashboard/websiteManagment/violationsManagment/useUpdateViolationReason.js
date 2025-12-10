
import { useMutation } from "@tanstack/react-query";
import { adminAxiosInstance } from "../../../../lib/adminAxios";

export default function useUpdateViolationReason() {
  const { mutate: updateViolationReason, isPending: updateViolateLoading } = useMutation({
    mutationFn: async ({ id, payload }) => {
      const res = await adminAxiosInstance.post(`dh-violation-reason/${id}`, {
        _method: "put",
        ...payload
      });

      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Error update violation reason");
      }

      return res.data;
    },
  })

  return { updateViolationReason, updateViolateLoading };
}