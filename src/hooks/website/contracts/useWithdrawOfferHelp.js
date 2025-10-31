import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../../lib/axios";

export default function useWithdrawOfferHelp() {
  const { mutate: withdrawOffer, isPending } = useMutation({
    mutationFn: async (id) => {
      const res = await axiosInstance.put(`my-contracts/${id}`);

      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Failed to withdraw offer");
      }
      return res.data;
    },
  });
  return { withdrawOffer, isPending };
}
