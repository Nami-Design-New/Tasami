import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../../lib/axios";

export default function useCancelContract() {
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

      return res.data.data;
    },
  });
  return { cancelContract, isPending };
}
