import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../../lib/axios";

export default function useCancelRequestOffer() {
  const queryClient = useQueryClient();
  const { mutate: cancelRequestOffer, isPending } = useMutation({
    mutationFn: async (id) => {
      const res = await axiosInstance.delete(`contract-request/${id}`);

      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Error canceling request");
      }

      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["counters-notify"] });
    },
  });
  return { cancelRequestOffer, isPending };
}
