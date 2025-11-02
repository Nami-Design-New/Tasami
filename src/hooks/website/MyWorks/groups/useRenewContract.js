import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../../../lib/axios";

export default function useRenewContract() {
  const { mutate: renewContract, isPending } = useMutation({
    mutationFn: async (payload) => {
      const res = await axiosInstance.post(`renew-contract`, payload);
      if (res.data.code !== 200) {
        throw new Error(res.data.message, "Error Renew Contract ");
      }
      return res?.data?.data;
    },
  });
  return { renewContract, isPending };
}
