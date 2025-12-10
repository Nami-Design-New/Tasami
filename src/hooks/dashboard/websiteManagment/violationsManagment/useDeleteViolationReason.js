
import { useMutation } from "@tanstack/react-query";
import { adminAxiosInstance } from "../../../../lib/adminAxios";

export default function useDeleteViolationReason() {
  const { mutate: deleteViolationReason, isPending: isDeletingViolationReason } = useMutation({
    mutationFn: async (violationId) => {
      const res = await adminAxiosInstance.delete(`dh-violation-reason/${violationId}`);

      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Error delete violation reason");
      }

      return res.data;
    },
  })

  return { deleteViolationReason, isDeletingViolationReason };
}