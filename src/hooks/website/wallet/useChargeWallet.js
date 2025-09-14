import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../../lib/axios";

export default function useChargeWallet() {
  const { mutate: charge, isPending } = useMutation({
    mutationFn: async (price) => {
      const res = await axiosInstance.post("wallet", { price });

      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Something went wrong");
      }
      return res.data;
    },
  });
  return { charge, isPending };
}
