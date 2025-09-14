import { useQuery } from "@tanstack/react-query";
import React from "react";
import { axiosInstance } from "../../../lib/axios";

export default function useGetWallaetBalance(id) {
  const { data: balance, isLoading } = useQuery({
    queryKey: ["wallet-balance", id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/wallet/${id}`);
      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Something went wrong");
      }

      return res.data.data;
    },
    enabled: !!id,
    refetchOnWindowFocus: true,
  });
  return { balance, isLoading };
}
