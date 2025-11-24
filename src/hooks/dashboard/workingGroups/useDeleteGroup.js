import { useMutation } from "@tanstack/react-query";
import { adminAxiosInstance } from "../../../lib/adminAxios";

export default function useDeleteGroup() {
  const { mutate: deleteWorkingGroup, isPending: isDeleting } = useMutation({
    mutationFn: async (id) => {
      const res = await adminAxiosInstance.delete(`dh-working-groups/${id}`);
      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Error deleting group");
      }
      return res.data;
    },
  });
  return { deleteWorkingGroup, isDeleting };
}
