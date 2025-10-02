import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../../lib/axios";

export default function useRequestOffer() {
  const { mutate: requestOffer, isPending } = useMutation({
    mutationFn: async (payload) => {
      const res = await axiosInstance.post("goal-offer", payload);
      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Error Requesting Offer");
      }
      return res.data;
    },
  });
  return { requestOffer, isPending };
}
