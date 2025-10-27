import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../../lib/axios";

export default function useOfferRequestPayment() {
  const { mutate: offerRequestPayment, isPending } = useMutation({
    mutationFn: async (data) => {
      const res = await axiosInstance.put(
        `pay-contract-request/${data.workId}`,
        null,
        {
          params: { payment_method: data.method },
        }
      );
      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Failed to process payment");
      }
      return res.data;
    },
  });
  return { offerRequestPayment, isPending };
}
