import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../../lib/axios";

export default function useWithdrawRenewRequest() {
  const { mutate: withdrawRenewRequest, isPending } = useMutation({
    mutationFn: async (id) => {
      const res = await axiosInstance.delete(`renew-contract/${id}`);
      if (res.data.code !== 200) {
        throw new Error(
          res.data.message || "error withdrawing the renew request"
        );
      }

      return res.data;
    },
  });
  return { withdrawRenewRequest, isPending };
}
