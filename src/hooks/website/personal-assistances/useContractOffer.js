import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../../lib/axios";

export default function useContractOffer() {
  const { mutate: contractOffer, isPending } = useMutation({
    mutationFn: async (payload) => {
      const res = await axiosInstance.post("contract-request", payload);
      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Error Requesting Offer");
      }
      return res.data;
    },
  });
  return { contractOffer, isPending };
}
