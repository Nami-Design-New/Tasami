import { useMutation } from "@tanstack/react-query";
import React from "react";
import { axiosInstance } from "../../../lib/axios";

export default function useWithdrawWallet() {
  const { mutate: withdrawWallet, isPending } = useMutation({
    mutationFn: async (payload) => {
      const res = await axiosInstance.post("withdraw-balance", payload);

      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Something went wrong");
      }
      return res.data;
    },
  });
  return { withdrawWallet, isPending };
}
