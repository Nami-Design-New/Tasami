import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../../lib/axios";

export default function useRateContract() {
  const { mutate: rateContract, isPending } = useMutation({
    mutationFn: async (payload) => {
      const res = await axiosInstance.post("contract-rate", payload);
      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Error Rating the COntract");
      }
      return res.data;
    },
  });
  return { rateContract, isPending };
}
