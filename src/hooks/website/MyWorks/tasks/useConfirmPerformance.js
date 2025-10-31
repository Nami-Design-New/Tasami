import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../../../lib/axios";

export default function useConfirmPerformance() {
  const { mutate: confirmPerformance, isPending } = useMutation({
    mutationFn: async (payload) => {
      const res = await axiosInstance.post(`task-rate`, payload);

      if (res.status !== 200) {
        throw new Error("Error confirming performance");
      }
      return res.data;
    },
  });
  return { confirmPerformance, isPending };
}
