import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../../lib/axios";

export default function useDeleteAssistance() {
  const { mutate: deleteAssistance, isPending } = useMutation({
    mutationFn: async (id) => {
      const res = await axiosInstance.delete(`my-help-service/${id}`);
      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Error Deleting Your Assistance");
      }
      return res.data;
    },
  });
  return { deleteAssistance, isPending };
}
