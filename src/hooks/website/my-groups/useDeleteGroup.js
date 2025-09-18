import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../../lib/axios";

export default function useDeleteGroup() {
  const { mutate: deleteGroup, isPending } = useMutation({
    mutationFn: async (id) => {
      const res = await axiosInstance.delete(`helper-groups/${id}`);
      if (res.data.code !== 200) {
        throw new Error(res.data.message || "error deleting group");
      }
      return res.data;
    },
  });
  return { deleteGroup, isPending };
}
