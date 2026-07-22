import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../../lib/axios";

export default function useCancelContract() {
  const queryClient = useQueryClient();
  const { mutate: cancelContract, isPending } = useMutation({
    mutationFn: async (payload) => {
      const res = await axiosInstance.delete(`helpers-of-goal/${payload.id}`, {
        params: {
          cancel_reason: payload.reason,
        },
      });

      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Error Fetching Data");
      }

      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["counters-notify"] });
    },
  });
  return { cancelContract, isPending };
}
