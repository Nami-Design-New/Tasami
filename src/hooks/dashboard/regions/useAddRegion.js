import { useMutation } from "@tanstack/react-query";
import React from "react";
import { adminAxiosInstance } from "../../../lib/adminAxios";

export default function useAddRegion() {
  const { mutate: addRegion, isPending: isAddingRegion } = useMutation({
    mutationFn: async (payload) => {
      const res = await adminAxiosInstance.post("dh-regions", payload);
      if (res.data.code !== 200) {
        throw new Error(res.data.message);
      }
      return res.data;
    },
  });
  return { addRegion, isAddingRegion };
}
