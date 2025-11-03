import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../../lib/axios";

export default function useAcceptOrRefuseRenewRequest() {
  const { mutate: acceptMutation, isPending: isAccepting } = useMutation({
    mutationFn: async (id) => {
      const res = await axiosInstance.put(`renew-contract/${id}`, null, {
        params: { renew_status: "accepted" },
      });
      if (res.data.code !== 200) {
        throw new Error(res.data.message || "something went wrong");
      }
      return res.data;
    },
  });

  const { mutate: refuseMutation, isPending: isRefusing } = useMutation({
    mutationFn: async (id) => {
      const res = await axiosInstance.put(`renew-contract/${id}`, null, {
        params: { renew_status: "refused" },
      });
      if (res.data.code !== 200) {
        throw new Error(res.data.message || "something went wrong");
      }
      return res.data;
    },
  });

  return { acceptMutation, isRefusing, refuseMutation, isAccepting };
}
