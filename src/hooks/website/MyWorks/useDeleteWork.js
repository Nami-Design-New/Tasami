import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../../lib/axios";

export default function useDeleteWork() {
  const queryClient = useQueryClient();
  const { mutate: deleteWork, isPending } = useMutation({
    mutationFn: async (id) => {
      const res = await axiosInstance.delete(`my-works/${id}`);
      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Error Deleting Goal");
      }
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["counters-notify"] });
    },
  });
  return { deleteWork, isPending };
}
